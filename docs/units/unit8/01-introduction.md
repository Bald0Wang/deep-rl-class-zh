> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit8/introduction.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit8/introduction.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 介绍

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/thumbnail.png" alt="第 8 单元"/>

在第 6 单元中,我们学习了优势演员-评论家(Advantage Actor Critic,A2C),这是一种混合架构,结合了基于价值(value-based)与基于策略(policy)的方法,通过降低方差来帮助稳定训练:

- *演员(Actor)*:控制**智能体(agent)如何行动**(基于策略的方法)。
- *评论家(Critic)*:衡量**所采取的动作有多好**(基于价值的方法)。

今天我们将学习近端策略优化(Proximal Policy Optimization,PPO),这种架构**通过避免过大的策略更新来提升智能体训练的稳定性**。为此,我们使用一个比率来表示当前策略与旧策略之间的差异,并将该比率裁剪到一个特定范围 \( [1 - \epsilon, 1 + \epsilon] \) 内。

这样做能确保**策略更新不会过大,训练也更加稳定。**

本单元分为两部分:
- 在第一部分,你将学习 PPO 背后的理论,并参考 [CleanRL](https://github.com/vwxyzjn/cleanrl) 的实现从零开始编写你的 PPO 智能体。为了测试其鲁棒性,你将使用 LunarLander-v2。LunarLander-v2 **是你开始学习这门课程时使用的第一个环境(environment)**。那时你还不知道 PPO 是如何工作的,而现在,**你已经可以从零开始编写它并训练它。这是多么不可思议啊 🤩**。
- 在第二部分,我们将使用 [Sample-Factory](https://samplefactory.dev/) 更深入地探究 PPO 优化,并训练一个玩 VizDoom(Doom 的开源版本)的智能体。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/environments.png" alt="环境"/>
<figcaption>这些就是你将用来训练智能体的环境:VizDoom 环境</figcaption>
</figure>

听起来很令人兴奋吧?让我们开始吧!🚀
