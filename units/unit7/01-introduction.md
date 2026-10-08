> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit7/introduction.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit7/introduction.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 引言

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit0/thumbnail.png" alt="Thumbnail"/>

从课程开始以来,我们学习的都是在一个*单智能体系统*中训练智能体:智能体独自处在它的环境中,**不与其他智能体合作或协作**。

这种方式效果很好,而且单智能体系统对许多应用来说都非常有用。


<figure>

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/patchwork.jpg" alt="Patchwork"/>

<figcaption>
课程开始至今你训练智能体所用的所有环境的拼图
</figcaption>
</figure>

但作为人类,**我们生活在一个多智能体的世界里**。我们的智慧来源于与其他智能体的交互。因此,我们的**目标是创造出能够与其他人类和其他智能体交互的智能体**。

所以,我们必须研究如何在*多智能体系统*中训练深度强化学习智能体,从而构建出能够适应、合作或竞争的健壮智能体。

今天,我们就来**学习多智能体强化学习(Multi-Agents Reinforcement Learning, MARL)这一精彩主题的基础知识**。

最令人兴奋的是,在本单元中,你将在多智能体系统中训练你的第一批智能体:**一支需要击败对手球队的 2v2 足球队**。

## 课程维护通知 🚧

请注意,本**深度强化学习课程目前处于低维护状态**。不过,它**仍然是学习深度强化学习理论与实践的绝佳资源**。

请牢记以下几点:

- *第 7 单元(AI vs AI)*:该功能目前无法使用。不过,你仍然可以训练你的智能体踢足球并观察它的表现。但 AI vs AI 足球排行榜已经关闭。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/soccertwos.gif" alt="SoccerTwos"/>

<figcaption>该环境由 <a href="https://github.com/Unity-Technologies/ml-agents">Unity MLAgents Team</a> 制作</figcaption>

</figure>

那我们就开始吧!
