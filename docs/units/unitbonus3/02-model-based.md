> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/model-based.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/model-based.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 基于模型的强化学习(Model-Based Reinforcement Learning,MBRL)

基于模型的强化学习与其无模型(model-free)对应方法的区别仅在于要学习一个*动力学模型*(dynamics model),但这会对决策的制定方式产生实质性的下游影响。

动力学模型通常对环境的转移动力学(transition dynamics)进行建模,\( s_{t+1} = f_\theta (s_t, a_t) \),但逆动力学模型(从状态映射到动作)或奖励模型(预测奖励)等同样可以纳入这一框架。


## 简单定义

- 有一个智能体(agent)反复尝试解决某个问题,**不断积累状态和动作数据**。
- 利用这些数据,智能体构建起一个结构化的学习工具,*即动力学模型*,用来对世界进行推理。
- 借助动力学模型,智能体**通过预测未来来决定如何行动**。
- 凭借这些动作,**智能体收集更多数据、改进该模型,并有望改进未来的动作**。

## 学术定义

基于模型的强化学习(MBRL)遵循智能体与环境(environment)交互的框架:**学习该环境的模型**,然后**利用该模型进行控制(做出决策)**。

具体而言,智能体在一个由转移函数 \( s_{t+1} = f (s_t , a_t) \) 支配的马尔可夫决策过程(Markov Decision Process,MDP)中行动,并在每一步获得奖励 \( r(s_t, a_t) \)。利用收集到的数据集 \( D :={ s_i, a_i, s_{i+1}, r_i} \),智能体学习一个模型 \( s_{t+1} = f_\theta (s_t , a_t) \),**以最小化各条转移的负对数似然**。

我们使用学习到的动力学模型来执行基于采样的模型预测控制(model-predictive control,MPC):它在一组从均匀分布 \( U(a) \) 中采样的动作集合上,优化有限且递归预测的时域 \( \tau \) 内的期望奖励(参见[论文](https://arxiv.org/pdf/2002.04523)、[论文](https://arxiv.org/pdf/2012.09156.pdf)或[论文](https://arxiv.org/pdf/2009.01221.pdf))。

## 延伸阅读

如需了解 MBRL 的更多信息,我们推荐你查阅以下资源:

- 一篇[关于调试 MBRL 的博客文章](https://www.natolambert.com/writing/debugging-mbrl)。
- 一篇[关于 MBRL 的近期综述论文](https://arxiv.org/abs/2006.16712),

## 作者

本节由 <a href="https://twitter.com/natolambert"> Nathan Lambert </a> 撰写
