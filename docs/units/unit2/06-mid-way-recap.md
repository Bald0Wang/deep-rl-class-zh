> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/mid-way-recap.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/mid-way-recap.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 阶段性回顾

在深入学习 Q-Learning 之前,我们先来总结一下刚刚学到的内容。

我们有两种基于价值的函数:

- 状态价值函数(state-value function):输出**智能体从某个给定状态出发,此后一直依据策略行动**所能获得的期望回报。
- 动作价值函数(action-value function):输出**智能体从某个给定状态出发、在该状态下执行某个给定动作**,此后一直依据策略行动所能获得的期望回报。
- 在基于价值的方法中,我们并不直接学习策略,而是**手动定义策略**,并学习一个价值函数。只要得到了最优价值函数,我们**就拥有了最优策略。**

更新价值函数的方法有两种:

- 使用*蒙特卡洛方法*时,我们基于一个完整回合来更新价值函数,因此**使用的是该回合实际的折扣回报。**
- 使用*时序差分学习方法*时,我们基于一步来更新价值函数,用**一个称为 TD 目标(TD target)的估计回报**来代替未知的 \\(G_t\\)。


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/summary-learning-mtds.jpg" alt="总结"/>
