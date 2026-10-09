> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit1/two-methods.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit1/two-methods.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 解决强化学习问题的两种主要方法

!!! tip
    既然我们已经学习了强化学习的框架,那么该如何解决强化学习问题呢?

换句话说,我们如何构建一个能够**选择最大化期望累积奖励的动作**的强化学习智能体?

## 策略 π(Policy):智能体的大脑

策略(Policy)**π** 是**我们智能体的大脑**,它是一个函数,告诉我们在当前状态下**应该采取什么动作**。因此,它**定义了智能体在给定时刻的行为**。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/policy_1.jpg" alt="策略" />
<figcaption>把策略想象成我们智能体的大脑,一个在给定状态时告诉我们该采取什么动作的函数</figcaption>
</figure>

这个策略**就是我们要学习的函数**,我们的目标是找到最优策略 π\*(optimal policy),也就是当智能体按照它行动时,能够**最大化期望回报(expected return)**的策略。我们**通过训练**来找到这个 π\*。

有两种方法可以训练我们的智能体来找到这个最优策略 π\*:

- **直接地**,教智能体学习在给定当前状态时应该**采取哪个动作**:即**策略方法(Policy-Based Methods)**。
- 间接地,**教智能体学习哪个状态更有价值**,然后采取**能通向更有价值状态**的动作:即价值方法(Value-Based Methods)。

## 策略方法(Policy-Based Methods)

在策略方法中,**我们直接学习一个策略函数**。

这个函数会定义一个从每个状态到对应最佳动作的映射;或者,它也可以定义**该状态下所有可能动作集合上的一个概率分布**。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/policy_2.jpg" alt="策略" />
<figcaption>正如这里所看到的,策略(确定性)<b>直接指示了每一步应采取的动作。</b></figcaption>
</figure>


策略有两种类型:


- *确定性(Deterministic)*:在给定状态下,策略**总是返回相同的动作。**

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/policy_3.jpg" alt="策略"/>
<figcaption>action = policy(state)</figcaption>
</figure>

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/policy_4.jpg" alt="策略" width="100%"/>

- *随机(Stochastic)*:输出**动作集合上的一个概率分布。**

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/policy_5.jpg" alt="策略"/>
<figcaption>policy(actions | state) = 在给定当前状态的情况下,动作集合上的概率分布</figcaption>
</figure>

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/policy-based.png" alt="策略方法"/>
<figcaption>给定一个初始状态,我们的随机策略会输出该状态下各可能动作的概率分布。</figcaption>
</figure>


我们来总结一下:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/pbm_1.jpg" alt="策略方法小结" width="100%" />
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/pbm_2.jpg" alt="策略方法小结" width="100%" />


## 价值方法(Value-Based Methods)

在价值方法中,我们不是学习策略函数,而是**学习一个价值函数(value function)**,它将一个状态映射到**处于该状态的期望价值**。

一个状态的价值,是智能体**从这个状态出发、然后按照我们的策略行动**所能获得的**期望折扣回报(expected discounted return)**。

"按照我们的策略行动"只是意味着,我们的策略就是**"前往价值最高的状态"**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/value_1.jpg" alt="基于价值的强化学习" width="100%" />

这里我们可以看到,价值函数**为每个可能的状态都定义了价值**。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/value_2.jpg" alt="基于价值的强化学习"/>
<figcaption>多亏了价值函数,在每一步,我们的策略都会选择价值函数所定义的价值最大的状态:-7,然后 -6,再 -5(依此类推),最终到达目标。</figcaption>
</figure>

多亏了价值函数,在每一步,我们的策略都会选择价值函数所定义的价值最大的状态:-7,然后 -6,再 -5(依此类推),最终到达目标。

我们来总结一下:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/vbm_1.jpg" alt="价值方法小结" width="100%" />
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/vbm_2.jpg" alt="价值方法小结" width="100%" />
