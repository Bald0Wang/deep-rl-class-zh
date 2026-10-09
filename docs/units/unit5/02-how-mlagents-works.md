> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit5/how-mlagents-works.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit5/how-mlagents-works.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# Unity ML-Agents 是如何工作的?

在训练智能体之前,我们需要弄清楚 **ML-Agents 是什么、又是如何工作的**。

## Unity ML-Agents 是什么?

[Unity ML-Agents](https://github.com/Unity-Technologies/ml-agents) 是一个面向 Unity 游戏引擎的工具包,**让我们既能用 Unity 创建环境,也能使用预制环境来训练智能体**。

它由 [Unity Technologies](https://unity.com/) 开发——也就是 Unity 的开发商。Unity 是最著名的游戏引擎之一,《看火人》(Firewatch)、《茶杯头》(Cuphead)和《城市:天际线》(Cities: Skylines)的创作者都在使用它。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit5/firewatch.jpeg" alt="《看火人》"/>
<figcaption>《看火人》(Firewatch)就是用 Unity 制作的</figcaption>
</figure>

## 六大组件

使用 Unity ML-Agents 时,你会接触到六个必不可少的组件:

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit5/mlagents-1.png" alt="MLAgents"/>
<figcaption>来源:<a href="https://unity-technologies.github.io/ml-agents/">Unity ML-Agents 文档</a> </figcaption>
</figure>

- 第一个是*学习环境(Learning Environment)*,它包含 **Unity 场景(即环境)和环境中的各个元素**(游戏角色)。
- 第二个是 *Python 底层 API(Python Low-level API)*,它包含**用于与环境交互和操控环境的底层 Python 接口**。我们用来启动训练的正是这个 API。
- 接着是*外部通信器(External Communicator)*,它负责**把学习环境(用 C# 编写)与底层 Python API(Python)连接起来**。
- *Python 训练器(Python trainers)*:即**用 PyTorch 实现的强化学习算法(PPO、SAC 等)**。
- *Gym 封装器(Gym wrapper)*:用于把强化学习环境封装进 gym wrapper。
- *PettingZoo 封装器(PettingZoo wrapper)*:PettingZoo 是 gym wrapper 的多智能体版本。

## 学习组件内部

在学习组件内部,有**两个重要元素**:

- 第一个是*智能体组件(agent component)*,它是场景中的主角。我们将**通过优化它的策略来训练智能体**(策略会告诉我们在每个状态下应采取什么动作)。这里的策略被称为 *Brain*(大脑)。
- 最后是 *Academy*(学院)。这个组件负责**统筹各个智能体及其决策过程**。可以把 Academy 想象成一位负责处理 Python API 请求的老师。

为了更好地理解它的作用,我们先回顾一下强化学习(RL)的过程。它可以建模为一个循环,工作方式如下:

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/RL_process.jpg" alt="强化学习过程" width="100%">
<figcaption>强化学习过程:由状态、动作、奖励和下一个状态构成的循环</figcaption>
<figcaption>来源:<a href="http://incompleteideas.net/book/RLbook2020.pdf">《强化学习导论》(Reinforcement Learning: An Introduction),Richard Sutton 与 Andrew G. Barto</a></figcaption>
</figure>

现在,想象一个正在学习玩平台跳跃游戏的智能体。它的强化学习过程是这样的:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/RL_process_game.jpg" alt="强化学习过程" width="100%">

- 智能体从**环境(Environment)**接收到**状态 \\(S_0\\)**——也就是我们收到了游戏(环境)的第一帧画面。
- 基于**状态 \\(S_0\\)**,智能体采取**动作 \\(A_0\\)**——我们的智能体会向右移动。
- 环境进入**新**的**状态 \\(S_1\\)**——新的一帧画面。
- 环境给智能体一定的**奖励 \\(R_1\\)**——我们还没死*(正奖励 +1)*。

这个强化学习循环会输出一个由**状态、动作、奖励和下一个状态**组成的序列。智能体的目标是**最大化期望累积奖励**。

而 Academy 正是那个会**向我们的智能体下达指令、并确保所有智能体保持同步**的角色:

- 收集观测(Observations)
- 用你的策略选择动作
- 执行该动作
- 如果达到最大步数或回合结束,就重置。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit5/academy.png" alt="ML-Agents 的 Academy" width="100%">


现在我们已经理解了 ML-Agents 的工作原理,**可以开始训练我们的智能体了**。
