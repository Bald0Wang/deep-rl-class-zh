> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/decision-transformers.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/decision-transformers.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# Decision Transformers

Decision Transformer 模型由论文 ["Decision Transformer: Reinforcement Learning via Sequence Modeling"(Chen L. et al.)](https://arxiv.org/abs/2106.01345)提出。它将强化学习抽象为一个条件序列建模(conditional sequence modeling)问题。

其核心思想是:不再用 RL 方法(比如拟合价值函数)来训练策略(policy),再由策略告诉我们要采取什么动作(action)才能最大化回报(return,即累积奖励(reward)),而是**使用一种序列建模(sequence modeling)算法(Transformer),在给定期望回报、过去状态(state)和动作的条件下,生成未来动作来实现这一期望回报**。
它是一个以期望回报、过去状态和动作为条件的自回归(autoregressive)模型,用来生成能够实现期望回报的未来动作。

这是强化学习范式的一次彻底转变:我们用生成式轨迹建模(对状态、动作与奖励序列的联合分布进行建模)取代了传统的 RL 算法。这意味着在 Decision Transformer 中,我们不再最大化回报,而是生成一系列能够实现期望回报的未来动作。

🤗 Transformers 团队将 Decision Transformer——一种离线强化学习(Offline RL)方法——集成进了 Transformers 库以及 Hugging Face Hub。

## 了解 Decision Transformer

要进一步了解 Decision Transformer,你可以阅读我们为其撰写的博客文章 [Introducing Decision Transformers on Hugging Face](https://huggingface.co/blog/decision-transformers)

## 训练你的第一个 Decision Transformer

在通过 [Introducing Decision Transformers on Hugging Face](https://huggingface.co/blog/decision-transformers) 了解了 Decision Transformer 的工作原理之后,你就可以学习如何从零开始训练你的第一个离线 Decision Transformer 模型,让 half-cheetah(半猎豹机器人)跑起来。

从这里开始本教程 👉 https://huggingface.co/blog/train-decision-transformers

## 延伸阅读

如需了解更多信息,我们建议你查阅以下资源:

- [Decision Transformer: Reinforcement Learning via Sequence Modeling](https://arxiv.org/abs/2106.01345)
- [Online Decision Transformer](https://arxiv.org/abs/2202.05607)

## 作者

本节由 <a href="https://twitter.com/edwardbeeching">Edward Beeching</a> 撰写
