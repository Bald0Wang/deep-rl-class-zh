> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus5/customize-the-environment.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus5/customize-the-environment.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# (可选)如何自定义环境

如果你想自定义游戏关卡,请打开关卡场景 `res://scenes/level.tscn`,然后在 Godot 的 FileSystem 中打开 `res://scenes/modules/` 文件夹:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/level_scene.jpg" alt="关卡场景"/>

该关卡由使用模块搭建的 3 个房间、机器人以及一些额外的碰撞体(collider)组成,这些碰撞体用于防止玩家通过攀爬第一个房间里的墙壁直接够到钥匙、跳过关卡。把模块添加到场景中,你就可以新增房间和物品。

如果你点击 Key 节点(它位于 `Room3` 中,你也可以直接搜索找到它),然后点击 `Node > Signals`,你会看到 `collected` 信号同时连接到了机器人和宝箱。我们用它来追踪机器人是否已收集钥匙,并解锁宝箱。同样的系统也用于通过拉杆激活楼梯;如果你添加了更多拉杆/楼梯/钥匙,也可以用信号把它们连接起来。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/level_signals.jpg" alt="关卡信号"/>

如果切换到 `Groups`,你会看到钥匙是 `resetable` 组的成员。同一个组里还有木筏、拉杆、宝箱、玩家,任何需要在回合(episode)重置时一并重置的节点都可以加入这个组。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/resetables_group.jpg" alt="resetables 组"/>

要让这一机制生效,`resetable` 组中的每个对象还需要实现 `reset()` 方法,由它负责重置该对象。

由于训练时会同时存在关卡场景的多个实例,我们不会重置所有 `resetable` 对象,而只重置同一场景内的那些。`level_manager.gd` 中有一个 `reset_all_resetables()` 方法负责此事,当需要重置时,机器人脚本会调用它。

修改关卡尺寸之后,还需要更新 `robot_ai_controller.gd` 中的 `level_size` 变量。为此,只需大致量出关卡最长方向的尺寸,然后更新该变量即可。

如果你更改了 `AIController` 需要追踪的对象数量(拉杆、木筏等),就需要更新脚本中的相关代码,为这些对象添加导出(export)属性,然后在关卡场景中 `AIController` 的检查器属性里把它们连接起来:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/ai_controller_inspector_properties.jpg" alt="AIController 检查器属性"/>

在此之后,你可能还需要在示范录制场景中更新 `AIController` 的相同属性。
