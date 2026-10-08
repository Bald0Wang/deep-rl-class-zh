> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit1/glossary.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit1/glossary.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 术语表

这是一份由社区共同创建的术语表,欢迎贡献!

### 智能体(Agent)

智能体**通过反复试错,并根据周围环境给予的奖励和惩罚,学会做出决策**。

### 环境(Environment)

环境是一个模拟出来的世界,智能体可以在其中**通过与环境交互进行学习**。

### 马尔可夫性质(Markov Property)

它意味着智能体所采取的动作**仅仅取决于当前状态,而与过去的状态和动作无关**。

### 观测/状态(Observations/State)

- **状态(State)**:对世界状态的完整描述。
- **观测(Observation)**:对环境/世界状态的部分描述。

### 动作(Actions)

- **离散动作(Discrete Actions)**:动作数量有限,例如左、右、上、下。
- **连续动作(Continuous Actions)**:动作的可能性是无限的;例如在自动驾驶汽车的场景中,驾驶过程中可能出现无穷多种动作。

### 奖励与折扣(Rewards and Discounting)

- **奖励(Rewards)**:强化学习中的根本要素,它告诉智能体所采取的动作是好是坏。
- 强化学习算法的目标是最大化**累积奖励(cumulative reward)**。
- **奖励假设(Reward Hypothesis)**:强化学习问题可以表述为对(累积)回报(return)的最大化。
- 之所以要进行**折扣(discounting)**,是因为早期获得的奖励比长期奖励更容易预测,因此更有可能真正发生。

### 任务(Tasks)

- **回合式任务(Episodic)**:有起点和终点。
- **连续任务(Continuous)**:有起点但没有终点。

### 探索与利用的权衡(Exploration v/s Exploitation Trade-Off)

- **探索(Exploration)**:指通过尝试随机动作来探索环境,并从环境中获得反馈/回报/奖励。
- **利用(Exploitation)**:指利用我们对环境已有的认识来获取最大的奖励。
- **探索与利用的权衡(Exploration-Exploitation Trade-Off)**:它权衡了我们想要**探索**环境的程度,以及我们想要**利用**已有环境知识的程度。

### 策略(Policy)

- **策略(Policy)**:被称为智能体的"大脑"。它告诉我们,在给定状态下应该采取什么动作。
- **最优策略(Optimal Policy)**:当智能体依据它行动时,**能最大化期望回报(expected return)**的策略。它通过*训练*习得。

### 基于策略的方法(Policy-based Methods):

- 一种解决强化学习问题的思路。
- 在这种方法中,策略被直接学习。
- 它会把每个状态映射到该状态下最佳的动作,或者映射为该状态下一组可能动作上的概率分布。

### 基于价值的方法(Value-based Methods):

- 另一种解决强化学习问题的思路。
- 在这种思路中,我们不训练策略,而是训练一个**价值函数(value function)**,它将每个状态映射到处于该状态的期望价值。

欢迎贡献 🤗

如果你想改进这门课程,可以[提交 Pull Request。](https://github.com/huggingface/deep-rl-class/pulls)

本术语表的形成离不开以下贡献者:

- [@lucifermorningstar1305](https://github.com/lucifermorningstar1305)
- [@daspartho](https://github.com/daspartho)
- [@misza222](https://github.com/misza222)
