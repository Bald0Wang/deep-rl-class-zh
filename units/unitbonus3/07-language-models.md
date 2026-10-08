> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/language-models.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/language-models.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 强化学习中的语言模型
## 语言模型为智能体编码了有用的知识

**语言模型**(Language Models,LM)在处理文本时可以展现出令人惊叹的能力,比如问答,甚至逐步推理。此外,它们在海量文本语料上的训练使其**编码了多种类型的知识,其中包括关于我们世界物理规则的抽象知识**(例如,对一个物体可以做些什么、旋转一个物体会发生什么……)。

近期有一个很自然的问题受到研究:这类知识能否帮助机器人等智能体(agent)完成日常任务。这些工作虽然展示了有趣的结果,但所提出的智能体缺乏任何学习方法。**这一局限使这些智能体无法适应环境(environment)(例如修正错误的知识),也无法学习新技能。**

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit12/language.png" alt="语言">
<figcaption>来源:<a href="https://ai.googleblog.com/2022/08/towards-helpful-robots-grounding.html">Towards Helpful Robots: Grounding Language in Robotic Affordances</a></figcaption>
</figure>

## 语言模型与强化学习

因此,能够带来关于世界知识的语言模型,与能够通过与环境交互来对齐并纠正这些知识的强化学习之间,存在潜在的协同效应。从 RL 的视角来看这一点尤其有趣,因为 RL 领域主要依赖于**白板**(Tabula-rasa)式设定——一切知识都由智能体从零开始学习,这会导致:

1) 样本效率低下

2) 在人类眼中出现出乎意料的行为

作为首次尝试,论文 ["Grounding Large Language Models with Online Reinforcement Learning"](https://arxiv.org/abs/2302.02662v1)研究了**使用近端策略优化(PPO)将语言模型适配或对齐到文本环境**这一问题。他们表明,语言模型中编码的知识使其能够快速适应环境(为样本高效的 RL 智能体开辟了道路),同时这类知识也使对齐后的语言模型能更好地泛化到新任务。

<video src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit12/papier_v4.mp4" type="video/mp4" controls />

[“Guiding Pretraining in Reinforcement Learning with Large Language Models”](https://arxiv.org/abs/2302.06692) 研究的另一个方向,则是冻结语言模型,但利用其知识来**引导 RL 智能体的探索**。这种方法能让 RL 智能体被引导向对人类有意义、且大概率有用的行为,而无需在训练过程中引入人在环(human in the loop)。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit12/language2.png" alt="语言">
<figcaption> 来源:<a href="https://ai.googleblog.com/2022/08/towards-helpful-robots-grounding.html"> Towards Helpful Robots: Grounding Language in Robotic Affordances</a>  </figcaption>
</figure>

若干局限使这些工作仍处于非常初步的阶段,例如需要先将智能体的观测转换为文本再输入语言模型,以及与超大规模语言模型交互带来的计算成本。

## 延伸阅读

如需了解更多信息,我们推荐你查阅以下资源:

- [Google Research, 2022 & beyond: Robotics](https://ai.googleblog.com/2023/02/google-research-2022-beyond-robotics.html)
- [Pre-Trained Language Models for Interactive Decision-Making](https://arxiv.org/abs/2202.01771)
- [Grounding Large Language Models with Online Reinforcement Learning](https://arxiv.org/abs/2302.02662v1)
- [Guiding Pretraining in Reinforcement Learning with Large Language Models](https://arxiv.org/abs/2302.06692)

## 作者

本节由 <a href="https://twitter.com/ClementRomac"> Clément Romac </a> 撰写
