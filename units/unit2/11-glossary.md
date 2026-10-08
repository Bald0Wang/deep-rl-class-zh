> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/glossary.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/glossary.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 术语表

这是一份由社区创建的术语表,欢迎大家一起贡献!


### 寻找最优策略的方法

- **基于策略的方法(Policy-based methods)。** 策略通常用一个神经网络来训练,以便在给定状态下选择要采取的动作。在这种情况下,是由神经网络直接输出智能体应采取的动作,而不借助价值函数。根据从环境中获得的经验,神经网络会被重新调整,从而给出更好的动作。
- **基于价值的方法(Value-based methods)。** 在这种情况下,我们训练一个价值函数,让它输出某个状态或状态-动作对的价值,并用它来表示我们的策略。然而,这个价值本身并不定义智能体应该采取什么动作;相反,我们需要根据价值函数的输出来规定智能体的行为方式。例如,我们可以决定采用这样的策略:总是采取能带来最大奖励的动作(贪婪策略,Greedy Policy)。总结一下,策略是一个贪婪策略(或用户指定的任何决策规则),它利用价值函数给出的价值来决定要采取的动作。

### 在基于价值的方法中,主要有两种策略

- **状态价值函数(State-value function)。** 对每个状态而言,状态价值函数指的是:如果智能体从该状态出发,并一直遵循策略直到结束,所能获得的期望回报。
- **动作价值函数(Action-value function)。** 与状态价值函数不同,动作价值函数针对每个状态-动作对计算期望回报:即智能体从该状态出发、采取该动作,此后一直遵循策略,所能获得的期望回报。

### epsilon-贪婪策略(epsilon-greedy strategy):

- 强化学习中常用的一种策略,用于平衡探索与利用。
- 以 1-epsilon 的概率选择期望奖励最高的动作。
- 以 epsilon 的概率选择一个随机动作。
- epsilon 通常会随时间递减,从而把重心逐渐转向利用。

### 贪婪策略(greedy strategy):

- 始终基于对环境的现有认知,选择预期回报最高的动作。(只进行利用)
- 总是选择期望奖励最高的动作。
- 不包含任何探索。
- 在存在不确定性或最优动作未知的环境中可能处于不利地位。

### 离策略(off-policy)与同策略(on-policy)算法

- **离策略(off-policy)算法:** 训练时和推断时使用的策略不同
- **同策略(on-policy)算法:** 训练和推断使用同一个策略

### 蒙特卡洛(Monte Carlo)与时序差分(Temporal Difference)学习策略

- **蒙特卡洛(Monte Carlo,MC):** 在回合结束时学习。使用蒙特卡洛方法时,我们等到回合结束,再用完整的回合来更新价值函数(或策略函数)。

- **时序差分(Temporal Difference,TD):** 在每一步学习。使用时序差分学习时,我们在每一步都更新价值函数(或策略函数),而不需要等一个完整的回合结束。

如果你想为课程做出改进,可以[提交一个 Pull Request。](https://github.com/huggingface/deep-rl-class/pulls)

本术语表的完成要感谢:

- [Ramón Rueda](https://github.com/ramon-rd)
- [Hasarindu Perera](https://github.com/hasarinduperera/)
- [Arkady Arkhangorodsky](https://github.com/arkadyark/)
