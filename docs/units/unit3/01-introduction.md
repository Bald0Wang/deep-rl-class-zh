> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit3/introduction.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit3/introduction.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 深度 Q 学习(Deep Q-Learning)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/thumbnail.jpg" alt="第 3 单元缩略图" width="100%">



在上一个单元中,我们学习了第一个强化学习算法:Q-Learning,**从零开始实现了它**,并在两个环境——FrozenLake-v1(冰冻湖)☃️ 和 Taxi-v3(出租车)🚕 中进行了训练。

我们用这个简单的算法取得了非常出色的结果,但这些环境相对简单,因为它们的**状态空间是离散且较小的**(FrozenLake-v1 有 16 个不同状态,Taxi-v3 有 500 个)。相比之下,Atari 游戏的状态空间**可以包含 \(10^{9}\) 到 \(10^{11}\) 个状态**。

但正如我们将看到的,在状态空间很大的环境中,**生成和更新 Q 表(Q-table)会变得低效**。

因此在本单元中,**我们将研究第一个深度强化学习智能体:深度 Q 学习**。深度 Q 学习不再使用 Q 表,而是使用一个神经网络:它接收一个状态,并基于该状态近似每个动作的 Q 值。

我们还将**使用 [RL-Zoo](https://github.com/DLR-RM/rl-baselines3-zoo) 训练它去玩 Space Invaders(太空侵略者)和其他 Atari 环境**。RL-Zoo 是一个基于 Stable-Baselines 的强化学习训练框架,提供了用于训练、评估智能体、调优超参数、绘制结果图表和录制视频的脚本。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/atari-envs.gif" alt="环境"/>

那么,让我们开始吧!🚀
