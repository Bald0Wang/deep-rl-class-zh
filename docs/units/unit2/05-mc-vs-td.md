> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/mc-vs-td.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/mc-vs-td.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 蒙特卡洛方法与时序差分学习

在深入学习 Q-Learning 之前,我们还需要讨论最后一项内容:两种学习策略。

请记住,强化学习智能体是**通过与环境的交互来学习的**。其核心思想是:**智能体会根据获得的经验和奖励,更新自己的价值函数或策略。**

蒙特卡洛方法(Monte Carlo)与时序差分学习(Temporal Difference Learning,简称 TD)是两种不同的**训练策略,决定了我们如何训练价值函数或策略函数。**两者都**利用经验来解决强化学习问题。**

一方面,蒙特卡洛方法要**先积累一整个回合的经验,然后才开始学习**;另一方面,时序差分学习只用**一步( \\(S_t, A_t, R_{t+1}, S_{t+1}\\) )的经验来学习。**

我们将**通过一个基于价值方法的例子**来讲解这两种方法。

## 蒙特卡洛方法:在回合结束时学习

蒙特卡洛方法会等到回合结束,计算出 \\(G_t\\)(回报),并将其作为**更新 \\(V(S_t)\\) 的目标。**

因此,它需要**一个完整的交互回合,才能更新我们的价值函数。**

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/monte-carlo-approach.jpg" alt="蒙特卡洛方法"/>


举个例子:

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/MC-2.jpg" alt="蒙特卡洛方法"/>


- 我们总是从**同一个起点开始回合。**
- **智能体依据策略采取动作**。例如使用 epsilon-贪婪策略(Epsilon Greedy Strategy),一种在探索(随机动作)与利用之间交替的策略。
- 我们获得**奖励和下一个状态。**
- 如果猫吃掉了老鼠,或者老鼠移动超过 10 步,我们就结束回合。

- 在回合结束时,**我们会得到一个由(状态、动作、奖励、下一状态)元组组成的列表**
例如 [[状态:下方第 3 格, 向左, +1, 状态:下方第 2 格], [状态:下方第 2 格, 向左, +0, 状态:下方第 1 格]……]

- **智能体会把总奖励加总为 \\(G_t\\)**(以衡量它表现得如何)。
- 然后会**根据以下公式更新 \\(V(s_t)\\)**

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/MC-3.jpg" alt="蒙特卡洛方法"/>

- 接着**带着这些新知识开始新一轮游戏**

通过运行越来越多的回合,**智能体会学得越来越好。**

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/MC-3p.jpg" alt="蒙特卡洛方法"/>

例如,如果我们用蒙特卡洛方法训练一个状态价值函数:

- 我们把价值函数初始化为**对每个状态都返回 0**
- 我们的学习率(lr)为 0.1,折扣率为 1(即不做折扣)
- 我们的老鼠**探索环境并随机采取动作**

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/MC-4.jpg" alt="蒙特卡洛方法"/>


- 老鼠走了超过 10 步,因此回合结束。

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/MC-4p.jpg" alt="蒙特卡洛方法"/>



- 我们得到了状态、动作、奖励、下一状态的列表,**需要计算回报 \\(G{t=0}\\)**

\\(G_t = R_{t+1} + R_{t+2} + R_{t+3} ...\\)(为简单起见,我们对奖励不做折扣)

\\(G_0 = R_{1} + R_{2} + R_{3}…\\)

\\(G_0 = 1 + 0 + 0 + 0 + 0 + 0 + 1 + 1 + 0 + 0\\)

\\(G_0 = 3\\)

- 现在我们可以计算**新的** \\(V(S_0)\\):

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/MC-5.jpg" alt="蒙特卡洛方法"/>

\\(V(S_0) = V(S_0) + lr * [G_0 — V(S_0)]\\)

\\(V(S_0) = 0 + 0.1 * [3 – 0]\\)

\\(V(S_0) = 0.3\\)


  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/MC-5p.jpg" alt="蒙特卡洛方法"/>


## 时序差分学习:每一步都学习

**与之相对,时序差分只需等待一次交互(一步) \\(S_{t+1}\\)**,就能构成 TD 目标,并用 \\(R_{t+1}\\) 和 \\( \gamma * V(S_{t+1})\\) 来更新 \\(V(S_t)\\)。

**TD 的核心思想是在每一步都更新 \\(V(S_t)\\)。**

但由于我们没有经历完整的回合,手头并没有 \\(G_t\\)(期望回报)。作为替代,**我们用 \\(R_{t+1}\\) 加上下一个状态的折扣价值来估计 \\(G_t\\)。**

这叫做自举(bootstrapping)。之所以这样称呼,**是因为 TD 的更新部分建立在已有的估计值 \\(V(S_{t+1})\\) 之上,而不是完整的样本 \\(G_t\\)。**

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/TD-1.jpg" alt="时序差分"/>


这种方法被称为 TD(0) 或**单步 TD(每执行一步就更新一次价值函数)。**

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/TD-1p.jpg" alt="时序差分"/>

我们来看同样的例子:

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/TD-2.jpg" alt="时序差分"/>

- 我们把价值函数初始化为对每个状态都返回 0。
- 学习率(lr)为 0.1,折扣率为 1(不做折扣)。
- 我们的老鼠开始探索环境,并随机采取了一个动作:**向左走**
- 它获得了奖励 \\(R_{t+1} = 1\\),因为**它吃到了一块奶酪**

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/TD-2p.jpg" alt="时序差分"/>


  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/TD-3.jpg" alt="时序差分"/>

现在我们可以更新 \\(V(S_0)\\):

新的 \\(V(S_0) = V(S_0) + lr * [R_1 + \gamma * V(S_1) - V(S_0)]\\)

新的 \\(V(S_0) = 0 + 0.1 * [1 + 1 * 0–0]\\)

新的 \\(V(S_0) = 0.1\\)

这样我们就更新了状态 0 的价值函数。

接下来,我们**用更新后的价值函数继续与环境交互。**

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/TD-3p.jpg" alt="时序差分"/>

  总结一下:

  - 使用*蒙特卡洛方法*时,我们基于一个完整回合来更新价值函数,因此**使用的是该回合实际、精确的折扣回报。**
  - 使用*时序差分学习*时,我们基于一步来更新价值函数,并用**一个称为 TD 目标(TD target)的估计回报**来代替未知的 \\(G_t\\)。

  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Summary.jpg" alt="总结"/>
