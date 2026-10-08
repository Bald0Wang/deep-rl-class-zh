> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus5/getting-started.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus5/getting-started.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 开始

首先,从[这里](https://huggingface.co/ivan267/imitation-learning-tutorial-godot-project/tree/main)下载项目(点击 `GDRL-IL-Project.zip` 旁边的下载图标)。这个 zip 文件同时包含“Starter”和“Complete”两个项目。

游戏代码已经在 starter 项目中实现完毕,节点也都配置好了。我们将专注于:

- 实现 AIController 节点的代码,
- 录制专家示范(expert demonstrations),
- 训练智能体并导出 .onnx 文件,以便在 Godot 中进行推理。

### 在 Godot 中打开 starter 项目

解压 zip 文件,打开 Godot,点击“Import”,然后导航到解压得到的 `Starter\Godot` 文件夹。

### 打开 robot 场景

<Tip>
你可以在 FileSystem 搜索框中搜索“robot”。
</Tip>

该场景包含若干不同的节点,其中包括 `robot` 节点,它包含机器人的外观形状;还有 `CameraXRotation` 节点,在人类控制模式下用于通过鼠标上下旋转相机。AI 智能体不控制这个节点,因为学习该任务并不需要它。`RaycastSensors` 节点则包含两个射线检测(Raycast)传感器,帮助智能体“感知”游戏世界中的各个部分,比如墙壁、地面等。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/open-robot-scene.jpg" alt="打开 robot 场景"/>

### 点击 AIController3D 旁边的卷轴图标,打开脚本进行编辑

<Tip>
你可能需要先收起“robot”分支才能更容易找到它,也可以在 `Robot` 节点上方的 Filter 框中输入 `aicontroller`。
</Tip>

### 将 `get_obs()` 和 `get_reward()` 方法替换为下面的实现:

```python
func get_obs() -> Dictionary:
	var observations: Array[float] = []
	for raycast_sensor in raycast_sensors:
		observations.append_array(raycast_sensor.get_observation())

	var level_size = 16.0

	var chest_local = to_local(chest.global_position)
	var chest_direction = chest_local.normalized()
	var chest_distance = clampf(chest_local.length(), 0.0, level_size)

	var lever_local = to_local(lever.global_position)
	var lever_direction = lever_local.normalized()
	var lever_distance = clampf(lever_local.length(), 0.0, level_size)

	var key_local = to_local(key.global_position)
	var key_direction = key_local.normalized()
	var key_distance = clampf(key_local.length(), 0.0, level_size)

	var raft_local = to_local(raft.global_position)
	var raft_direction = raft_local.normalized()
	var raft_distance = clampf(raft_local.length(), 0.0, level_size)

	var player_speed = player.global_basis.inverse() * player.velocity.limit_length(5.0) / 5.0

	(
		observations
		.append_array(
			[
				chest_direction.x,
				chest_direction.y,
				chest_direction.z,
				chest_distance,
				lever_direction.x,
				lever_direction.y,
				lever_direction.z,
				lever_distance,
				key_direction.x,
				key_direction.y,
				key_direction.z,
				key_distance,
				raft_direction.x,
				raft_direction.y,
				raft_direction.z,
				raft_distance,
				raft.movement_direction_multiplier,
				float(player._is_lever_pulled),
				float(player._is_chest_opened),
				float(player._is_key_collected),
				float(player.is_on_floor()),
				player_speed.x,
				player_speed.y,
				player_speed.z,
			]
		)
	)
	return {"obs": observations}

func get_reward() -> float:
	return reward
```

在 `get_obs()` 中,我们首先从在检查器(Inspector)中添加到 `AIController3D` 节点上的两个 Raycast 传感器获取观测,并把它们加入观测中;然后获取指向宝箱、拉杆、钥匙和木筏的相对位置向量,将其拆分为方向和距离,同样加入观测中。

我们还向观测中加入了其他游戏状态信息:

- 拉杆是否已被拉动,
- 钥匙是否已被收集,
- 宝箱是否已被打开,
- 玩家是否在地面上(这也决定了玩家能否跳跃),
- 玩家归一化后的局部速度。

我们把 `_is_lever_pulled` 这类布尔值转换为浮点数(0 或 1)。

在 `get_reward()` 中,我们只需返回当前奖励即可。

### 将 `_physics_process()` 和 `reset()` 方法替换为下面的实现:

```python
func _physics_process(delta: float) -> void:
	# 超时后重置:父类中已实现该逻辑,会把 needs_reset 设为 true,
	# 我们在这里重新实现,是为了调用负责处理游戏重置的 player.game_over()
	n_steps += 1
	if n_steps > reset_after:
		player.game_over()

	# 在训练或 onnx 推理模式下,该方法会由 sync 节点调用并传入动作;
	# 在专家示范录制模式下,调用时不带任何动作(因为我们根据人类输入来设置动作);
	# 在人类控制模式下该方法不会被调用,因此我们在这里手动调用它,不传入任何动作
	if control_mode == ControlModes.HUMAN:
		set_action()

	# 如果拉杆尚未被拉动,就更快地重置游戏
	steps_without_lever_pulled += 1
	if steps_without_lever_pulled > 200 and (not player._is_lever_pulled):
		player.game_over()

func reset():
	super.reset()
	steps_without_lever_pulled = 0
```

### **将 `get_action_space()`、`get_action()` 和 `set_action()` 方法替换为下面的实现:**

```python
# 为 AI 智能体定义动作("size": 2 表示该动作由 2 个浮点数组成)
func get_action_space() -> Dictionary:
	return {
		"movement": {"size": 2, "action_type": "continuous"},
		"rotation": {"size": 1, "action_type": "continuous"},
		"jump": {"size": 1, "action_type": "continuous"},
		"use_action": {"size": 1, "action_type": "continuous"}
	}

# 我们按照 get_action_space() 中定义的顺序返回动作值(这一点很重要),只是全部放在同一个数组里
# 对于 size 为 1 的动作,数组中返回 1 个浮点数;size 为 2 则返回 2 个浮点数,依此类推
# sync 节点会先调用 set_action 再调用 get_action,因此我们可以读到刚设置的新值
func get_action():
	return [
		# "movement" 动作值
		player.requested_movement.x,
		player.requested_movement.y,
		# "rotation" 动作值
		player.requested_rotation.x,
		# "jump" 动作值(未请求时为 -1,请求时为 1)
		-1.0 + 2.0 * float(player.jump_requested),
		# "use_action" 动作值(未请求时为 -1,请求时为 1)
		-1.0 + 2.0 * float(player.use_action_requested)
	]

# 这里我们把人类控制或 AI 控制的动作设置给机器人
func set_action(action = null) -> void:
	# 如果没有传入动作,说明 AI 没有在控制机器人(人类控制模式)
	if not action:
		# 只有当鼠标自上次 set_action 调用后发生过移动时才旋转
		if previous_mouse_movement == mouse_movement:
			mouse_movement = Vector2.ZERO

		player.requested_movement = Input.get_vector(
			"move_left", "move_right", "move_forward", "move_back"
		)
		player.requested_rotation = mouse_movement

		var use_action = Input.is_action_pressed("requested_action")
		var jump = Input.is_action_pressed("requested_jump")

		player.use_action_requested = use_action
		player.jump_requested = jump

		previous_mouse_movement = mouse_movement
	else:
		# 如果传入了动作,我们就把从 AI 智能体那里收到的动作设置上去
		player.requested_movement = Vector2(action.movement[0], action.movement[1])
		# 智能体只沿 Y 轴旋转机器人,无需沿 X 轴旋转相机
		player.requested_rotation = Vector2(action.rotation[0], 0.0)
		player.jump_requested = bool(action.jump[0] > 0)
		player.use_action_requested = bool(action.use_action[0] > 0)
```

对于 `get_action()`(只有在使用示范录制模式时才需要),我们需要提供希望智能体在遇到相同状态时发送的动作。这些值必须处于正确的范围(`-1.0 到 1.0`)——这正是我们对布尔状态采用 `-1 + 2 * variable` 写法的原因——并且顺序必须与 `get_action_space()` 中定义的顺序一致。

在示范录制模式下,调用 `set_action()` 时不传入动作,因为我们需要根据人类输入来设置动作值。在训练/推理模式下,调用该方法时会带有一个 `action` 参数,其中包含 RL 模型给出的所有动作的值,所以我们用一个 `if/else` 来处理这两种情况。

更多信息见代码注释。

### 将 `_input` 方法替换为下面的实现:

```python
# 为 human 和 demo_record 模式记录鼠标移动
# 我们不直接在输入事件中执行旋转,以便支持跳帧(action_repeat 设置),
# 该机制在训练/推理模式下同样会作用于 AI 智能体
func _input(event):
	if not (heuristic == "human" or heuristic == "demo_record"):
		return

	if event is InputEventMouseMotion:
		var movement_scale: float = 0.005
		mouse_movement.y = clampf(event.relative.y * movement_scale, -1.0, 1.0)
		mouse_movement.x = clampf(event.relative.x * movement_scale, -1.0, 1.0)
```

这部分代码用于在人类控制模式和示范录制模式下记录鼠标移动。

**最后,保存脚本。我们就可以进行下一步了。**

### 打开示范录制场景,并点击 AIController3D 节点

<Tip>
你可以在 FileSystem 搜索框中搜索“demo”,也可以在场景的过滤框中搜索“aicontroller”。
</Tip>

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/demo_record_scene.jpg" alt="示范录制场景"/>


你不需要做任何修改,因为一切都已预设好,不过我们还是过一遍在你自己的环境中需要设置的内容:

该场景包含修改过的 `Level > Robot > AIController3D` 节点设置:

- `Control Mode`(控制模式)设为 `Record Expert Demos`,
- `Expert Demo Save Path`(专家示范保存路径)已填写,
- `Action Repeat`(动作重复)设置为与 `training_scene` 和 `onnx_inference_scene` 中 `Sync` 节点相同的值。这意味着智能体设置的每个动作会重复生效 3 个物理帧。`AIController` 中的这一设置会对人类输入施加同样的动作重复(会带来一些延迟),以保持行为一致。这个值相当低,不会引入太多延迟。如果你修改了这个值,请务必在全部 3 处同步修改,
- `Remove Last Episode`(移除最后一局)按键允许我们设置一个键,用于在录制过程中移除失败的一局,而不必重启整个会话。例如,当机器人掉进水里、游戏重置时,我们可以在录制下一局的同时用这个键移除上一局录制的内容。它被设为 `R`,点击它再点击 `Configure` 按钮,即可改成任意按键。

在有挑战性的环境中,让录制一局变得更轻松的另一种方法,是在录制时减慢环境速度。只需点击场景中的 `Sync` 节点,调整 `Speed Up`(加速)属性(默认为 1)即可轻松做到。

### 我们来录制一些示范:

<Tip>
注意,只有当我们至少完整录制了一局(episode),并且通过点击“X”或按下 ALT+F4 关闭游戏窗口时,示范才会被保存。使用 Godot 编辑器中的停止按钮不会保存示范。最好先尝试只录制一局,然后检查文件系统中或 Godot 项目文件夹里是否出现了“expert_demos.json”。
</Tip>

确认你仍处于 `demo_record_scene`,然后`按下 F6`,示范录制就会开始。

操作方式:

- 鼠标控制相机(如果需要调整鼠标灵敏度,请打开 `robot` 场景,点击 `Robot` 节点并调整 `Rotation Speed`;录制示范、训练和推理时要保持相同的值),
- `WASD` 控制玩家移动,
- `SPACE` 跳跃,
- `E` 拉动拉杆并打开宝箱

你可以先练习几次,熟悉一下环境。如果你想跳过录制示范,也可以在 complete 项目中找到预先录制好的示范,直接使用其中的 `expert_demos.json` 文件。

录制的示范应至少包含 22-24 局完整成功的游戏。训练阶段也可以使用多个示范文件,因此你不必一次性录完所有示范(你可以用前面提到的 `Expert Demo Save Path` 属性来修改文件名)。

我录制 23 局大约花了 10 分钟(由于钥匙有 2 个交替出现的生成位置,录 22 或 24 局可以让钥匙位置在示范中均匀分布,不过差距也不大)。在靠近拉杆或宝箱时,我会把 `E` 键稍微多按住一会儿,以确保在靠近这些物体时该动作被记录为多个步骤。我还在下一局的录制过程中按下 `R` 键,删除了几局没有成功完成的录制。

下面是示范录制过程的加速视频:

<video src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/demo_record.mp4" type="video/mp4" controls autoplay loop mute />

### 导出游戏用于训练:

你可以在 Godot 中通过 `Project > Export` 导出游戏。
