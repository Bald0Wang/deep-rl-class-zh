> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/offline-online.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/offline-online.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 离线强化学习 vs. 在线强化学习

深度强化学习(Deep Reinforcement Learning,RL)是一个**构建决策智能体(agent)的框架**。这些智能体的目标是通过与环境交互、**依靠试错并将奖励作为唯一反馈**来学习最优行为(即策略(policy))。

智能体的目标**是最大化其累积奖励**,也称为回报(return)。因为强化学习建立在*奖励假设*(reward hypothesis)之上:所有目标都可以描述为**对期望累积奖励的最大化**。

深度强化学习智能体**通过一批批经验数据来学习**。问题在于,它们如何收集这些数据?:

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit12/offlinevsonlinerl.gif" alt="Bonus Unit 3 缩略图">
<figcaption>在线设定与离线设定下强化学习的对比,图片来自<a href="https://offline-rl.github.io/">这篇文章</a></figcaption>
</figure>

- 在*在线强化学习*(online reinforcement learning)中——也就是我们在本课程中所学的——智能体**直接收集数据**:它通过**与环境交互**来收集一批经验数据。然后,它会立即使用这些经验(或通过某种经验回放缓冲区)从中学习(更新其策略)。

但这意味着,你要么**直接在真实世界中训练智能体,要么拥有一个模拟器**。如果没有模拟器,你就需要自己构建一个,这可能非常复杂(如何在环境中反映真实世界的复杂现实?)、成本高昂,而且并不安全(如果模拟器存在可能带来竞争优势的缺陷,智能体就会去利用这些缺陷)。

- 另一方面,在*离线强化学习*(offline reinforcement learning)中,智能体只**使用从其他智能体或人类演示中收集的数据**。它**不与环境交互**。

流程如下:
- 使用一个或多个策略和/或人类交互**创建数据集**。
- **在该数据集上运行离线强化学习**来学习一个策略

这种方法有一个缺陷:*反事实查询问题*(counterfactual queries problem)。如果我们的智能体**决定做一件我们没有对应数据的事情怎么办?**例如,在路口右转,但我们没有这条轨迹的数据。

关于这一主题已有一些解决方案,但如果你想进一步了解离线强化学习,可以[观看这个视频](https://www.youtube.com/watch?v=k08N5a0gG0A)

## 延伸阅读

如需了解更多信息,我们推荐你查阅以下资源:

- [Offline Reinforcement Learning, Talk by Sergei Levine(Sergei Levine 关于离线强化学习的演讲)](https://www.youtube.com/watch?v=qgZPZREor5I)
- [Offline Reinforcement Learning: Tutorial, Review, and Perspectives on Open Problems(离线强化学习:教程、综述与开放问题展望)](https://arxiv.org/abs/2005.01643)

## 作者

本节由 <a href="https://twitter.com/ThomasSimonini"> Thomas Simonini</a> 撰写
