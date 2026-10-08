> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit6/introduction.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit6/introduction.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 简介


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/thumbnail.png"  alt="缩略图"/>

在第 4 单元中,我们学习了第一个基于策略(Policy-Based)的算法——**REINFORCE**。

在基于策略的方法中,**我们的目标是不借助价值函数(value function),直接优化策略(policy)**。更准确地说,REINFORCE 属于*基于策略的方法*的一个子类——*策略梯度(Policy-Gradient)方法*。这个子类通过**使用梯度上升(Gradient Ascent)来估计最优策略的权重**,从而直接优化策略。

我们看到 REINFORCE 的效果不错。然而,由于我们使用蒙特卡洛(Monte-Carlo)采样来估计回报(return)(也就是要用一个完整的回合(episode)来计算回报),**策略梯度的估计存在很大的方差(variance)**。

请记住,策略梯度的估计就是**让回报增长最快的方向**。换句话说,它告诉我们该如何更新策略权重,使得那些能带来高回报的动作有更高的概率被选中。我们将在本单元进一步研究蒙特卡洛方差——**它会导致训练变慢,因为我们需要大量样本才能缓解它**。

所以今天我们将学习 **Actor-Critic(演员-评论家)方法**,这是一种结合了基于价值(Value-Based)方法与基于策略方法的混合架构,它借助以下两个部分降低方差、稳定训练:
- *演员(Actor)*:控制**智能体(agent)如何行动**(基于策略的方法)
- *评论家(Critic)*:衡量**所采取动作的好坏**(基于价值的方法)


我们将研究其中一种混合方法——优势 Actor-Critic(A2C),**并使用 Stable-Baselines3 在机器人环境中训练我们的智能体**。我们要训练的是:
- 一只机械臂 🦾,让它移动到正确的位置。

听起来很令人兴奋吧?让我们开始吧!
