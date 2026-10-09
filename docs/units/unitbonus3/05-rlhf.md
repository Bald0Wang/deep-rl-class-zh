> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/rlhf.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/rlhf.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 基于人类反馈的强化学习(RLHF)

基于人类反馈的强化学习(Reinforcement Learning from Human Feedback,RLHF)是**一种将人类数据标签融入基于 RL 的优化过程的方法论**。
它的动机来自**建模人类偏好(preference)的挑战**。

对于许多问题,即使你可以尝试为某个理想目标写下一个公式,人类彼此之间的偏好仍会各不相同。

让模型**基于测量得到的数据进行更新,是尝试缓解这些人类固有的机器学习问题的一条途径**。

## 开始学习 RLHF

要开始学习 RLHF:

1. 阅读这篇介绍:[Illustrating Reinforcement Learning from Human Feedback (RLHF)(图解基于人类反馈的强化学习)](https://huggingface.co/blog/rlhf)。

2. 观看我们几周前录制的直播,Nathan 在其中讲解了基于人类反馈的强化学习(RLHF)的基础知识,以及这项技术如何被用于支撑 ChatGPT 这类最先进的机器学习工具。
直播的大部分内容是对这些相互关联的机器学习模型的概述,涵盖了自然语言处理和强化学习的基础知识,以及 RLHF 如何被应用于大型语言模型(Large Language Models,LLM)。最后我们以 RLHF 中的开放性问题作结。

[▶️ 观看本节视频(YouTube)](https://www.youtube.com/watch?v=2MBJOuVq380)

3. 阅读这一主题的其他博客,例如 [Closed-API vs Open-source continues: RLHF, ChatGPT, data moats](https://robotic.substack.com/p/rlhf-chatgpt-data-moats)。如果你还喜欢其他相关文章,欢迎告诉我们!


## 补充阅读

*注:以下内容复制自上文提到的 Illustrating RLHF 博客文章*。
以下是迄今为止 RLHF 领域最常见的论文清单。该领域随着深度强化学习(DeepRL)的兴起(约 2017 年)而近期广受关注,并已发展为众多大型科技公司围绕 LLM 应用的更广泛研究。
以下是一些早于"以语言模型为中心"阶段的 RLHF 论文:
- [TAMER: Training an Agent Manually via Evaluative Reinforcement](https://www.cs.utexas.edu/~pstone/Papers/bib2html-links/ICDL08-knox.pdf)(Knox and Stone 2008):提出了一种学习型智能体,由人类对其采取的动作迭代地打分,以此学习一个奖励模型(reward model)。
- [Interactive Learning from Policy-Dependent Human Feedback](http://proceedings.mlr.press/v70/macglashan17a/macglashan17a.pdf)(MacGlashan et al. 2017):提出了一种 actor-critic 算法 COACH,利用人类反馈(既有正反馈也有负反馈)来调整优势函数(advantage function)。
- [Deep Reinforcement Learning from Human Preferences](https://proceedings.neurips.cc/paper/2017/hash/d5e2c0adad503c91f91df240d0cd4e49-Abstract.html)(Christiano et al. 2017):将 RLHF 应用于对 Atari 轨迹的偏好比较。
- [Deep TAMER: Interactive Agent Shaping in High-Dimensional State Spaces](https://ojs.aaai.org/index.php/AAAI/article/view/11485)(Warnell et al. 2018):对 TAMER 框架的扩展,使用深度神经网络来建模奖励预测。

以下是一组(数量仍在增长的)论文的概览,它们展示了 RLHF 在语言模型上的表现:
- [Fine-Tuning Language Models from Human Preferences](https://arxiv.org/abs/1909.08593)(Zieglar et al. 2019):一篇早期论文,研究奖励学习对四个特定任务的影响。
- [Learning to summarize with human feedback](https://proceedings.neurips.cc/paper/2020/hash/1f89885d556929e98d3ef9b86448f951-Abstract.html)(Stiennon et al., 2020):将 RLHF 应用于文本摘要任务。后续工作还有 [Recursively Summarizing Books with Human Feedback](https://arxiv.org/abs/2109.10862)(OpenAI Alignment Team 2021),研究如何摘要整本书籍。
- [WebGPT: Browser-assisted question-answering with human feedback](https://arxiv.org/abs/2112.09332)(OpenAI, 2021):使用 RLHF 训练一个在网络上导航的智能体。
- InstructGPT:[Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)(OpenAI Alignment Team 2022):将 RLHF 应用于通用语言模型 [[关于 InstructGPT 的博客文章](https://openai.com/blog/instruction-following/)]。
- GopherCite:[Teaching language models to support answers with verified quotes](https://www.deepmind.com/publications/gophercite-teaching-language-models-to-support-answers-with-verified-quotes)(Menick et al. 2022):用 RLHF 训练语言模型,使其返回带有具体引用来源的答案。
- Sparrow:[Improving alignment of dialogue agents via targeted human judgements](https://arxiv.org/abs/2209.14375)(Glaese et al. 2022):用 RLHF 微调对话智能体
- [ChatGPT: Optimizing Language Models for Dialogue](https://openai.com/blog/chatgpt/)(OpenAI 2022):用 RLHF 训练语言模型,使其适合用作通用聊天机器人。
- [Scaling Laws for Reward Model Overoptimization](https://arxiv.org/abs/2210.10760)(Gao et al. 2022):研究 RLHF 中学习到的偏好模型的缩放特性。
- [Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback](https://arxiv.org/abs/2204.05862)(Anthropic, 2022):详细记录了用 RLHF 训练语言模型助手的过程。
- [Red Teaming Language Models to Reduce Harms: Methods, Scaling Behaviors, and Lessons Learned](https://arxiv.org/abs/2209.07858)(Ganguli et al. 2022):详细记录了"发现、测量并尝试减少[语言模型]潜在有害输出"的相关工作。
- [Dynamic Planning in Open-Ended Dialogue using Reinforcement Learning](https://arxiv.org/abs/2208.02294)(Cohen at al. 2022):使用 RL 提升开放式对话智能体的对话技巧。
- [Is Reinforcement Learning (Not) for Natural Language Processing?: Benchmarks, Baselines, and Building Blocks for Natural Language Policy Optimization](https://arxiv.org/abs/2210.01241)(Ramamurthy and Ammanabrolu et al. 2022):讨论了 RLHF 开源工具的设计空间,并提出了 NLPO(Natural Language Policy Optimization,自然语言策略优化)算法作为近端策略优化(PPO)的替代方案。

## 作者

本节由 <a href="https://twitter.com/natolambert"> Nathan Lambert </a> 撰写
