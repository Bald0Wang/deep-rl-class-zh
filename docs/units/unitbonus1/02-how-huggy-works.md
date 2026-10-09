> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus1/how-huggy-works.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus1/how-huggy-works.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# Huggy 是如何工作的

Huggy 是由 Hugging Face 制作的一个深度强化学习(Deep Reinforcement Learning)环境,它基于 [Unity MLAgents 团队的项目 Puppo the Corgi](https://blog.unity.com/technology/puppo-the-corgi-cuteness-overload-with-the-unity-ml-agents-toolkit)。
这个环境使用 [Unity 游戏引擎](https://unity.com/)和 [MLAgents](https://github.com/Unity-Technologies/ml-agents) 创建。ML-Agents 是 Unity 为其游戏引擎提供的一个工具包,它让我们能够**使用 Unity 创建环境,或者使用现成的环境来训练我们的智能体(agent)**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/huggy.jpg" alt="Huggy" width="100%">

在这个环境中,我们的目标是训练 Huggy **捡回我们扔出去的木棍。这意味着它需要朝木棍正确地移动**。

## 状态空间(State Space):Huggy 感知到了什么

Huggy 并不能"看到"它的环境。作为替代,我们向它提供关于环境的信息:

- 目标(木棍)的位置
- 它自身与目标之间的相对位置
- 它四条腿的朝向。

有了所有这些信息,Huggy 就能**用它的策略(policy)来决定下一步采取什么动作(action),以实现自己的目标**。

## 动作空间(Action Space):Huggy 能做出的移动
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/huggy-action.jpg" alt="Huggy 动作" width="100%">

**Huggy 的腿由关节电机(joint motor)驱动**。这意味着,为了拿到目标,Huggy 需要**学会正确地旋转每条腿的关节电机,才能移动起来**。

## 奖励函数(Reward Function)

奖励函数的设计初衷是让 **Huggy 实现自己的目标**:捡回木棍。

请记住,强化学习的基石之一是*奖励假设(reward hypothesis)*:一个目标可以被描述为**最大化期望累积奖励**。

在这里,我们的目标是让 Huggy **朝木棍跑去,但不要打转太多**。因此,我们的奖励函数必须把这一目标转化为奖励。

我们的奖励函数:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/reward.jpg" alt="Huggy 奖励函数" width="100%">

- *朝向奖励(orientation bonus)*:当它**接近目标时,我们给予它奖励**。
- *时间惩罚(time penalty)*:每次执行动作都会给一个固定的时间惩罚,以**迫使它尽快拿到木棍**。
- *旋转惩罚(rotation penalty)*:如果 Huggy **打转太多、转身太快**,我们就惩罚它。
- *到达目标奖励(getting to the target reward)*:当 Huggy **到达目标**时,我们奖励它。

如果你想从数学角度看看这个奖励函数长什么样,请查阅 [Puppo the Corgi 的项目介绍](https://blog.unity.com/technology/puppo-the-corgi-cuteness-overload-with-the-unity-ml-agents-toolkit)。

## 训练 Huggy

Huggy 的目标是**学会正确地、并且尽可能快地跑向目标**。为此,在每一步,根据环境给出的观测(observation),它需要决定如何旋转每条腿的关节电机,才能正确地移动(不过度打转)并朝目标前进。

训练循环如下所示:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/huggy-loop.jpg" alt="Huggy 训练循环" width="100%">


训练环境如下所示:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/training-env.jpg" alt="Huggy 训练环境" width="100%">


在这个环境中,**木棍会被随机生成**。当 Huggy 到达木棍后,木棍又会被生成到别的地方。
我们为训练构建了**环境的多个副本**。这能通过提供更多样化的经验来帮助加速训练。



现在你已经对这个环境有了整体认识,可以开始训练 Huggy 去捡木棍了。

为此,我们将使用 [MLAgents](https://github.com/Unity-Technologies/ml-agents)。如果你以前从未用过它,也不用担心。在本单元中,我们会用 Google Colab 来训练 Huggy,之后你就可以加载你训练好的 Huggy,直接在浏览器中和它一起玩。

在未来的某个单元中,我们会更深入地研究 MLAgents,看看它是如何工作的。但就目前而言,我们保持简单,直接使用现成的实现即可。
