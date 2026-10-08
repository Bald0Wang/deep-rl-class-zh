> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus5/introduction.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus5/introduction.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 简介

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/thumbnail.png" alt="Bonus Unit 4 缩略图"/>

欢迎来到本附加单元(bonus unit),在这里你将**使用模仿学习(Imitation Learning)训练一个机器人智能体来完成一个迷你游戏关卡。**

在本单元结束时,**你将得到一个如视频中所展示的、能够通过该关卡的已训练智能体**:

<video src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/onnx_inference_test.mp4" type="video/mp4" controls autoplay loop mute />


## 学习目标

- 学习如何结合 Godot RL Agents 使用模仿学习:训练一个智能体,利用人类录制的专家示范(expert demonstrations)来完成一个迷你游戏环境。

## 前置条件与要求

- 建议在开始本教程之前先完成前一章([Godot RL Agents](https://huggingface.co/learn/deep-rl-course/unitbonus3/godotrl)),
- 建议对 Godot 有一定程度的熟悉,不过完成本教程并不需要任何 gdscript 编程知识,
- 支持 .NET 的 Godot(已在 [4.3.dev5 .NET](https://godotengine.org/article/dev-snapshot-godot-4-3-dev-5/) 上测试可用,更高的版本或许也能使用),
- Godot RL Agents(可在 venv/conda 虚拟环境中执行 `pip install godot-rl` 来安装),
- [Imitation 库](https://huggingface.co/learn/deep-rl-course/unitbonus5/train-our-robot),
- 时间:完成项目与训练大约需要 1-2 小时。根据所用硬件不同,实际耗时可能超出这一范围。
