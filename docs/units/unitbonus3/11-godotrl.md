> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/godotrl.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/godotrl.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# Godot RL Agents

[Godot RL Agents](https://github.com/edbeeching/godot_rl_agents) 是一个开源软件包,让游戏创作者、AI 研究者和爱好者能够**为他们的非玩家角色(NPC)或智能体(agent)学习复杂行为**。

该库提供:

- 在 [Godot 引擎](https://godotengine.org/)中创建的游戏与运行于 Python 中的机器学习算法之间的接口
- 四个知名强化学习框架的封装:[StableBaselines3](https://stable-baselines3.readthedocs.io/en/master/)、[CleanRL](https://docs.cleanrl.dev/)、[Sample Factory](https://www.samplefactory.dev/) 和 [Ray RLLib](https://docs.ray.io/en/latest/rllib-algorithms.html)
- 支持基于 LSTM 或注意力机制的接口,用于具备记忆能力的智能体
- 支持 *2D 和 3D 游戏*
- 一套 *AI 传感器*,用于增强智能体观察游戏世界的能力
- Godot 和 Godot RL Agents **基于非常宽松的 MIT 许可证,完全免费且开源**。没有任何附加条件,没有版税,什么都没有。

你可以在它的 [GitHub 页面](https://github.com/edbeeching/godot_rl_agents)或 AAAI-2022 Workshop [论文](https://arxiv.org/abs/2112.03636)中了解更多关于 Godot RL Agents 的信息。该库的作者 [Ed Beeching](https://edbeeching.github.io/) 是 Hugging Face 的研究科学家。

安装该库非常简单:`pip install godot-rl`

## 用 Godot RL Agents 创建自定义强化学习环境

在本节中,你将**学习如何在 Godot 游戏引擎中创建一个自定义环境(environment)**,然后实现一个通过深度强化学习学会游戏的 AI 控制器。

我们今天创建的示例游戏很简单,**但展示了 Godot 引擎和 Godot RL Agents 库的许多特性**。之后你可以深入研究这些示例,实现更复杂的环境和行为。

我们今天要构建的环境叫做 Ring Pong,它就是乒乓球(Pong)游戏,只不过球场是一个圆环,球拍绕着圆环移动。**目标是让球在圆环内持续弹跳**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/ringpong.gif" alt="Ring Pong">

### 安装 Godot 游戏引擎

[Godot 游戏引擎](https://godotengine.org/)是一个用于**创建视频游戏、工具和用户界面**的开源工具。

Godot 引擎是一款功能丰富的跨平台游戏引擎,旨在通过统一的界面创建 2D 和 3D 游戏。它提供了一整套常用工具,让用户**可以专注于制作游戏,而不必重复造轮子**。游戏可以一键导出到多个平台,包括主流桌面平台(Linux、macOS、Windows),以及移动平台(Android、iOS)和网页平台(HTML5)。

我们会引导你完成实现智能体的各个步骤,但如果你希望更深入地了解 Godot 游戏引擎,它的[文档](https://docs.godotengine.org/en/latest/index.html)非常详尽,YouTube 上也有很多教程。我们还推荐 [GDQuest](https://www.gdquest.com/)、[KidsCanCode](https://kidscancode.org/godot_recipes/4.x/) 和 [Bramwell](https://www.youtube.com/channel/UCczi7Aq_dTKrQPF5ZV5J3gg) 作为学习资源。

要在 Godot 中创建游戏,**你必须先下载编辑器**。Godot RL Agents 支持最新版本的 Godot,即 Godot 4.0。

可以通过以下链接下载:

- [Windows](https://downloads.tuxfamily.org/godotengine/4.0.1/Godot_v4.0.1-stable_win64.exe.zip)
- [Mac](https://downloads.tuxfamily.org/godotengine/4.0.1/Godot_v4.0.1-stable_macos.universal.zip)
- [Linux](https://downloads.tuxfamily.org/godotengine/4.0.1/Godot_v4.0.1-stable_linux.x86_64.zip)

### 加载初始项目

我们提供了两个版本的代码库:
- [初始项目,下载后可跟随本教程操作](https://drive.google.com/file/d/1C7xd3TibJHlxFEJPBgBLpksgxrFZ3D8e/view?usp=share_link)
- [项目的最终版本,便于对比和调试。](https://drive.google.com/file/d/1k-b2Bu7uIA6poApbouX4c3sq98xqogpZ/view?usp=share_link)

要加载项目,在 Godot 项目管理器(Project Manager)中点击 **Import(导入)**,找到文件所在位置,加载 **project.godot** 文件。

如果你按下 F5 或在编辑器中点击运行,就可以以人类模式玩这个游戏。你会看到游戏同时运行了多个实例,这是因为我们希望用大量并行环境来加速 AI 智能体的训练。

### 安装 Godot RL Agents 插件

Godot RL Agents 插件可以从 GitHub 仓库安装,也可以通过编辑器中的 Godot Asset Lib(资源库)安装。

首先点击 AssetLib 并搜索 "rl"

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/godot1.png" alt="Godot">

然后点击 Godot RL Agents,点击 Download(下载),取消勾选 LICENSE 和 README 的 .md 文件,再点击 Install(安装)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/godot2.png" alt="Godot">


Godot RL Agents 插件现在已经下载到你的机器上了。接下来点击 Project → Project Settings(项目设置),启用该插件(addon):

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/godot3.png" alt="Godot">


### 添加 AI 控制器

现在我们要为游戏添加一个 AI 控制器。打开 player.tscn 场景,在左侧你应该能看到类似这样的节点层级:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/godot4.png" alt="Godot">

右键点击 **Player** 节点,点击 **Add Child Node(添加子节点)**。这里列出了很多节点,搜索 AIController3D 并创建它。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/godot5.png" alt="Godot">

AI Controller 节点应该已被添加到场景树中,它旁边有一个卷轴图标。点击它即可打开附加在 AIController 上的脚本。Godot 游戏引擎使用一种叫做 GDScript 的脚本语言,语法与 Python 相似。这个脚本包含了一些需要实现的方法,我们的 AI 控制器才能正常工作。

```python
#-- 使用 Godot 中的 "Extend Script(扩展脚本)" 选项时需要实现的方法 --#
func get_obs() -> Dictionary:
	assert(false, "the get_obs method is not implemented when extending from ai_controller")
	return {"obs":[]}

func get_reward() -> float:
	assert(false, "the get_reward method is not implemented when extending from ai_controller")
	return 0.0

func get_action_space() -> Dictionary:
	assert(false, "the get get_action_space method is not implemented when extending from ai_controller")
	return {
		"example_actions_continous" : {
			"size": 2,
			"action_type": "continuous"
		},
		"example_actions_discrete" : {
			"size": 2,
			"action_type": "discrete"
		},
		}

func set_action(action) -> void:
	assert(false, "the get set_action method is not implemented when extending from ai_controller")
# -----------------------------------------------------------------------------#
```

要实现这些方法,我们需要创建一个继承自 AIController3D 的类。这在 Godot 中很容易做到,称为"扩展(extend)"一个类。

右键点击 AIController3D 节点,点击 "Extend Script(扩展脚本)",并将新脚本命名为 `controller.gd`。此时你会得到一个几乎为空的脚本文件,内容如下:

```python
extends AIController3D

# 当节点首次进入场景树时调用。
func _ready():
	pass # 替换为函数体。

# 每帧调用一次。'delta' 是自上一帧以来经过的时间。
func _process(delta):
	pass
```

现在我们来实现这 4 个缺失的方法:删除这些代码,替换为下面的内容:

```python
extends AIController3D

# 存储为智能体的策略(运行在 Python 中)采样出的动作
var move_action : float = 0.0

func get_obs() -> Dictionary:
	# 获取球在球拍参考系下的位置和速度
	var ball_pos = to_local(_player.ball.global_position)
	var ball_vel = to_local(_player.ball.linear_velocity)
	var obs = [ball_pos.x, ball_pos.z, ball_vel.x/10.0, ball_vel.z/10.0]

	return {"obs":obs}

func get_reward() -> float:
	return reward

func get_action_space() -> Dictionary:
	return {
		"move_action" : {
			"size": 1,
			"action_type": "continuous"
		},
		}

func set_action(action) -> void:
	move_action = clamp(action["move_action"][0], -1.0, 1.0)
```

现在我们定义了智能体的观测(observation),即球在其局部坐标系下的位置和速度。我们还定义了智能体的动作空间(action space),它是一个取值范围从 -1 到 +1 的单一连续值。

下一步是更新 Player 的脚本,让它使用来自 AIController 的动作:点击 Player 节点旁边的卷轴图标打开其脚本,将 `Player.gd` 中的代码更新为如下内容:

```python
extends Node3D

@export var rotation_speed = 3.0
@onready var ball = get_node("../Ball")
@onready var ai_controller = $AIController3D

func _ready():
	ai_controller.init(self)

func game_over():
	ai_controller.done = true
	ai_controller.needs_reset = true

func _physics_process(delta):
	if ai_controller.needs_reset:
		ai_controller.reset()
		ball.reset()
		return

	var movement : float
	if ai_controller.heuristic == "human":
		movement = Input.get_axis("rotate_anticlockwise", "rotate_clockwise")
	else:
		movement = ai_controller.move_action
	rotate_y(movement*delta*rotation_speed)

func _on_area_3d_body_entered(body):
	ai_controller.reward += 1.0
```

现在,我们需要在 Godot 中运行的游戏与 Python 中正在训练的神经网络之间进行同步。Godot RL Agents 恰好提供了一个专门的节点。打开 train.tscn 场景,右键点击根节点,点击 "Add Child Node(添加子节点)"。然后搜索 "sync",添加一个 Godot RL Agents Sync 节点。该节点负责通过 TCP 在 Python 和 Godot 之间进行通信。

先用 `gdrl` 启动 Python 训练,你就可以在编辑器中实时运行训练了。

在这个简单的示例中,几分钟内就能学到一个不错的策略(policy)。如果你想加快训练速度,可以点击 train 场景中的 Sync 节点,你会看到编辑器中暴露出了一个 "Speed Up(加速)" 属性:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/godot6.png" alt="Godot">

尝试将该属性设置为最高 8,以加快训练速度。在更复杂的环境中,这会带来很大的好处,比如我们将在下一章中了解的多人 FPS 游戏。

### 导出模型

[参考文档](https://github.com/edbeeching/godot_rl_agents/tree/main?tab=readme-ov-file#exporting-and-loading-your-trained-agent-in-onnx-format)

现在让我们暂时放下 Godot 编辑器。要保存训练好的模型,我们需要使用终端运行一些命令。

最新版本的 Godot RL 库提供了实验性的 ONNX 模型支持,适用于 Stable Baselines 3、rllib 和 CleanRL 训练框架。

例如,我们以 Stable Baselines 3 作为框架。使用 [sb3 示例](https://github.com/edbeeching/godot_rl_agents/blob/main/examples/stable_baselines3_example.py)([脚本使用说明](https://github.com/edbeeching/godot_rl_agents/blob/main/docs/ADV_STABLE_BASELINES_3.md#train-a-model-from-scratch))训练你的智能体,并启用选项 `--onnx_export_path=model.onnx`

下面是一个可执行的命令行示例:

```bash
cd <....> # 进入这个 Godot 项目目录
python stable_baselines3_example.py --timesteps=100_000 --onnx_export_path=model.onnx --save_model_path=model.zip --save_checkpoint_frequency=20_000 --experiment_name=exp1
```

如果一切正常,你应该会在终端中看到如下输出信息:

```
No game binary has been provided, please press PLAY in the Godot editor
waiting for remote GODOT connection on port 11008
```

> 如果你在运行 stable_baselines3_example 脚本时遇到导入错误:"ImportError: cannot import name 'export_model_as_onnx' from 'godot_rl.wrappers.onnx.stable_baselines_export'",请参考[这个 issue](https://github.com/edbeeching/godot_rl_agents/issues/203) 中的解答。

现在切换回 Godot 编辑器,点击右上角的 PLAY(运行)。点击后,游戏场景会弹出并显示 AI 训练过程;与此同时,终端会开始打印各项指标。等待训练完成,如果一切正常,你应该能在 Godot 项目目录中找到 `model.onnx` 文件。

### 在游戏中应用 AI!

现在让我们把这个训练好的模型应用到游戏中!

在 Godot 编辑器中,找到 `train.tscn` 中的 Sync 节点:

* 在下拉菜单中把控制模式(control mode)改为 `Onnx Inference`
* 将 `Onnx Model Path` 设置为模型文件名,在本例中是 `model.onnx`

要运行这个游戏,我们需要 Godot 编辑器的 mono 版本(即 .NET 版本),可以从 Godot 官方页面下载。我们还需要安装 [.NET](https://dotnet.microsoft.com/en-us/download)。

第一次尝试时你很可能会遇到报错。下面列出了常见情形及解决办法。

1. 关于 `Invalid Call. Nonexistent function 'new' in base 'CSharpScript'` 的问题:[解决方案](https://github.com/edbeeching/godot_rl_agents/blob/main/docs/TROUBLESHOOTING.md)
2. MacOS 上有关 `onnxruntime` 的报错:[解决方案](https://github.com/microsoft/onnxruntime/issues/9707)


### 更多内容!

我们只是浅尝辄止地介绍了 Godot RL Agents 能实现的功能,该库还包含自定义传感器和相机,用于丰富智能体可获得的信息。不妨看看这些[示例](https://github.com/edbeeching/godot_rl_agents_examples),了解更多!

关于将训练好的模型导出为 .onnx(从而无需 Python 服务器即可直接在 Godot 中运行推理)以及其他实用的训练选项,请参阅[进阶 SB3 教程](https://github.com/edbeeching/godot_rl_agents/blob/main/docs/ADV_STABLE_BASELINES_3.md)。

## 作者

本节内容由 <a href="https://twitter.com/edwardbeeching">Edward Beeching</a> 撰写
