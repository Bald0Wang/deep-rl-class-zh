> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/q-learning.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/q-learning.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# Q-Learning 简介

## 什么是 Q-Learning?

Q-Learning 是一种**离策略(off-policy)的基于价值的方法,它使用 TD 的方式来训练动作价值函数:**

- *离策略(off-policy)*:这一点我们会在本单元结尾讨论。
- *基于价值的方法*:通过训练一个价值函数或动作价值函数来间接找到最优策略,该函数会告诉我们**每个状态或每个状态-动作对的价值。**
- *TD 方式*:**在每一步都更新动作价值函数,而不是等到回合结束时才更新。**

**Q-Learning 就是我们用来训练 Q 函数(Q-function)的算法。**Q 函数是一种**动作价值函数**,它给出处于某个特定状态并在该状态下执行某个特定动作的价值。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-function.jpg" alt="Q 函数"/>
  <figcaption>给定一个状态和一个动作,Q 函数会输出一个状态-动作价值(也称 Q 值)</figcaption>
</figure>

**Q 来自该动作在该状态下的"Quality"(质量,即价值)。**

我们再来回顾一下价值与奖励的区别:

- 某个*状态*或某个*状态-动作对*的*价值*,是指智能体从该状态(或状态-动作对)出发、此后一直依据其策略行动所能获得的期望累积奖励。
- *奖励*则是智能体在某个状态下执行一个动作之后,**从环境获得的反馈**。

在内部,Q 函数由**一张 Q 表(Q-table)编码:表中的每个单元格对应一个状态-动作对的价值。**可以把这张 Q 表看作**Q 函数的记忆或小抄。**

我们通过一个迷宫的例子来理解。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Maze-1.jpg" alt="迷宫示例"/>

Q 表已被初始化,这就是为什么所有值都等于 0。这张表**为每个状态和动作保存了对应的状态-动作价值。**
在这个简单的例子中,状态仅由老鼠的位置定义。因此我们的 Q 表有 2*3 行,每一行对应老鼠的一个可能位置。在更复杂的场景中,状态所包含的信息可能不止行动主体(actor)的位置。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Maze-2.jpg" alt="迷宫示例"/>

这里我们可以看到,**初始状态下"向上走"这一动作的状态-动作价值为 0:**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Maze-3.jpg" alt="迷宫示例"/>

所以:Q 函数使用一张**保存了每个状态-动作对价值的 Q 表。**给定一个状态和一个动作,**Q 函数会在它的 Q 表中查找并输出对应的价值。**

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-function-2.jpg" alt="Q 函数"/>
</figure>

回顾一下,*Q-Learning* **是这样一种强化学习算法:**

- 训练一个 *Q 函数*(一种**动作价值函数**),其内部是一张**包含所有状态-动作对价值的 Q 表。**
- 给定一个状态和一个动作,Q 函数**会在它的 Q 表中查找对应的价值。**
- 训练完成后,**我们就得到了一个最优 Q 函数,也就意味着我们拥有了一张最优 Q 表。**
- 而只要**拥有了最优 Q 函数**,我们**就拥有了最优策略**,因为我们**知道在每个状态下应该采取的最佳动作。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/link-value-policy.jpg" alt="价值与策略的联系"/>


一开始,**我们的 Q 表毫无用处,因为它给每个状态-动作对的都是任意值**(大多数情况下,我们把 Q 表初始化为 0)。随着智能体**不断探索环境、我们不断更新 Q 表,它对最优策略的近似也会越来越好。**

<figure class="image table text-center m-0 w-full">
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-1.jpg" alt="Q-learning"/>
  <figcaption>可以看到,随着训练的进行,我们的 Q 表越来越好,因为借助它,我们可以知道每个状态-动作对的价值。</figcaption>
</figure>

现在我们已经理解了什么是 Q-Learning、Q 函数和 Q 表,**接下来深入学习 Q-Learning 算法**。

## Q-Learning 算法

下面就是 Q-Learning 的伪代码;我们来逐一研究每个部分,**并在动手实现之前,通过一个简单的例子看看它是如何工作的。**别被它吓到,它比看上去简单!我们会逐步讲解每一步。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-2.jpg" alt="Q-learning"/>

### 第 1 步:初始化 Q 表

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-3.jpg" alt="Q-learning"/>


我们需要为每个状态-动作对初始化 Q 表。**大多数情况下,我们把所有值初始化为 0。**

### 第 2 步:使用 epsilon-贪婪策略选择动作

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-4.jpg" alt="Q-learning"/>


epsilon-贪婪策略(epsilon-greedy strategy)是一种处理探索与利用权衡的策略。

其思想是,以初始值 ɛ = 1.0 出发:

- *以 1 — ɛ 的概率*:我们进行**利用**(即智能体选择状态-动作对价值最高的动作)。
- 以 ɛ 的概率:**我们进行探索**(尝试随机动作)。

在训练开始时,**由于 ɛ 非常高,探索的概率会非常大,所以大多数时候我们都在探索。**但随着训练的推进,**Q 表的估计越来越好,我们会逐渐减小 epsilon 的值**,因为此时需要的探索越来越少,而需要的利用越来越多。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-5.jpg" alt="Q-learning"/>


### 第 3 步:执行动作 At,获得奖励 Rt+1 和下一状态 St+1

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-6.jpg" alt="Q-learning"/>

### 第 4 步:更新 Q(St, At)

请记住,在时序差分学习中,我们在**一步交互之后**就会更新策略或价值函数(具体取决于我们选择的强化学习方法)。

为了构造 TD 目标,**我们使用即时奖励 \(R_{t+1}\) 加上下一个状态的折扣价值**,后者通过找出在下一状态下使当前 Q 函数最大化的动作来计算。(我们称之为自举,bootstrap)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-7.jpg" alt="Q-learning"/>

因此,我们的 \(Q(S_t, A_t)\) **更新公式如下:**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Q-learning-8.jpg" alt="Q-learning"/>


这意味着,要更新 \(Q(S_t, A_t)\):

- 我们需要 \(S_t, A_t, R_{t+1}, S_{t+1}\)。
- 要更新某个状态-动作对上的 Q 值,我们使用 TD 目标。

TD 目标是如何构造的?
1. 执行动作 \(A_t\) 之后,我们获得奖励 \(R_{t+1}\)。
2. 为了得到下一状态的**最优状态-动作对价值**,我们使用贪婪策略(greedy policy)来选择下一个最佳动作。注意,这不是 epsilon-贪婪策略——贪婪策略总是选取状态-动作价值最高的动作。

当这个 Q 值更新完成后,我们进入一个新状态,并**再次使用 epsilon-贪婪策略**来选择动作。

**这就是为什么我们说 Q-Learning 是一种离策略(off-policy)算法。**

## 离策略与在策略

它们的区别很细微:

- *离策略(off-policy)*:**执行动作(推理)与更新(训练)使用不同的策略。**

例如,在 Q-Learning 中,epsilon-贪婪策略(动作执行策略)不同于贪婪策略,后者**用于选择下一状态的最佳动作价值来更新我们的 Q 值(更新策略)。**


<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/off-on-1.jpg" alt="离策略与在策略"/>
  <figcaption>动作执行策略</figcaption>
</figure>

它不同于我们在训练阶段所使用的策略:


<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/off-on-2.jpg" alt="离策略与在策略"/>
  <figcaption>更新策略</figcaption>
</figure>

- *在策略(on-policy)*:**执行动作与更新使用同一个策略。**

例如,对于另一个基于价值的算法 Sarsa,**由 epsilon-贪婪策略来选择下一个状态-动作对,而不是贪婪策略。**


<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/off-on-3.jpg" alt="离策略与在策略"/>
    <figcaption>Sarsa</figcaption>
</figure>

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/off-on-4.jpg" alt="离策略与在策略"/>
</figure>
