> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit8/introduction-sf.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit8/introduction-sf.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 使用 Sample-Factory 的 PPO 简介

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/thumbnail2.png" alt="缩略图"/>

在第 8 单元的第二部分中,我们将借助 [Sample-Factory](https://samplefactory.dev/)——一种 **PPO(近端策略优化,Proximal Policy Optimization)算法的异步实现**——更深入地探索 PPO 的优化过程,训练我们的智能体去玩 [ViZDoom](https://vizdoom.cs.put.edu.pl/)(Doom 的开源版本)。

在笔记本中,**你要训练智能体去玩 Health Gathering(生命补给收集)关卡**——在这个关卡中,智能体必须收集医疗包才能避免死亡。之后,你还可以**训练智能体挑战更复杂的关卡,比如死斗模式(Deathmatch)**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/environments.png" alt="环境"/>

听起来很刺激吧?让我们开始吧!🚀

本实战部分由 Hugging Face 的机器学习研究科学家 [Edward Beeching](https://twitter.com/edwardbeeching) 制作。他曾参与开发 Godot Reinforcement Learning Agents——一个用于在 Godot 游戏引擎中开发环境与智能体的开源接口。
