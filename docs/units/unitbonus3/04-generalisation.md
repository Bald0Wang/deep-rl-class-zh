> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/generalisation.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/generalisation.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 强化学习中的泛化

泛化(generalisation)在强化学习领域中扮演着举足轻重的角色。虽然 **RL 算法在受控环境中表现出良好的性能**,但真实世界因其**非平稳且开放的本质**而带来了**独特的挑战**。

因此,开发出能够在环境变化面前保持鲁棒的 RL 算法,并使其具备向未知但类似的任务与场景进行迁移和适应的能力,对于强化学习在真实世界中的应用而言至关重要。

如果你有兴趣深入研究这一研究方向,我们推荐探索以下资源:

- [Generalization in Reinforcement Learning by Robert Kirk(强化学习中的泛化,作者 Robert Kirk)](https://robertkirk.github.io/2022/01/17/generalisation-in-reinforcement-learning-survey.html):这份全面的综述对 **RL 中泛化这一概念**提供了富有洞见的概述,是你深入探索的绝佳起点。

- [Improving Generalization in Reinforcement Learning using Policy Similarity Embeddings(利用策略相似度嵌入提升强化学习的泛化能力)](https://blog.research.google/2021/09/improving-generalization-in.html?m=1)
