> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit3/deep-q-algorithm.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit3/deep-q-algorithm.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 深度 Q 学习算法

我们已经学到,深度 Q 学习**使用深度神经网络来近似某个状态下每个可能动作的不同 Q 值**(价值函数估计)。

区别在于,在训练阶段,深度 Q 学习不像 Q-Learning 那样直接更新某个状态-动作对的 Q 值:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-ex-5.jpg" alt="Q 损失"/>

在深度 Q 学习中,我们创建一个**损失函数,用来比较我们的 Q 值预测与 Q 目标(Q-target),并使用梯度下降来更新深度 Q 网络的权重,从而更好地近似我们的 Q 值**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/Q-target.jpg" alt="Q 目标"/>

深度 Q 学习训练算法有*两个阶段*:

- **采样(Sampling)**:我们执行动作,并**将观测到的经验元组(experience tuples)存储到回放记忆(replay memory)中**。
- **训练(Training)**:随机选取**一小批元组,并通过一步梯度下降更新从这批数据中学习**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/sampling-training.jpg" alt="采样与训练"/>

与 Q-Learning 相比,这并不是唯一的差异。深度 Q 学习的训练**可能出现不稳定**,主要原因是把非线性 Q 值函数(神经网络)与自举(bootstrapping,即用现有估计值而非真实完整回报来更新目标)结合在了一起。

为了稳定训练,我们实现三种不同的解决方案:
1. *经验回放(Experience Replay)*,以便更**高效地利用经验**。
2. *固定 Q 目标(Fixed Q-Target)*,**用于稳定训练**。
3. *双重深度 Q 学习(Double Deep Q-Learning)*,用于**解决 Q 值高估(overestimation)问题**。

让我们逐一介绍!

## 经验回放:更高效地利用经验

为什么要创建回放记忆?

深度 Q 学习中的经验回放有两个作用:

1. **在训练期间更高效地利用经验**。
通常,在在线强化学习中,智能体与环境交互,获得经验(状态、动作、奖励和下一状态),从中学习(更新神经网络),然后将其丢弃。这并不高效。

经验回放通过**更高效地利用训练中的经验**来提供帮助。我们使用一个回放缓冲区(replay buffer)来保存经验样本,**以便在训练期间重复使用**。
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/experience-replay.jpg" alt="经验回放"/>

⇒ 这让智能体能够**多次从相同的经验中学习**。

2. **避免遗忘以往的经验(又称灾难性干扰 catastrophic interference,或灾难性遗忘 catastrophic forgetting),并减少经验之间的相关性**。
- **[灾难性遗忘](https://en.wikipedia.org/wiki/Catastrophic_interference)**:如果我们把经验样本按时间顺序喂给神经网络,就会出现这样的问题:随着不断获得新经验,网络往往会**遗忘之前的经验**。例如,智能体先处于第一关,然后进入截然不同的第二关,它可能会忘记在第一关该如何行动和游玩。

解决方案是创建一个回放缓冲区,在与环境交互的同时存储经验元组,然后再从中采样一小批元组。这可以防止**网络只学习自己刚刚经历过的内容**。

经验回放还有其他好处。通过随机采样经验,我们消除了观测序列中的相关性,避免**动作价值出现剧烈振荡或发散**。

在深度 Q 学习的伪代码中,我们**初始化一个容量为 N 的回放记忆缓冲区 D**(N 是一个你可以自行定义的超参数)。然后我们把经验存入该记忆,并在训练阶段采样一批经验来喂给深度 Q 网络。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/experience-replay-pseudocode.jpg" alt="经验回放伪代码"/>

## 固定 Q 目标:稳定训练

当我们想要计算 TD 误差(即损失)时,我们计算 **TD 目标(Q-Target)与当前 Q 值(Q 的估计)之间的差**。

但是我们**完全不知道真实的 TD 目标**。我们需要对它进行估计。利用贝尔曼方程(Bellman equation)我们已知,TD 目标就是在该状态下执行该动作所获得的奖励,再加上下一状态的折扣最高 Q 值。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/Q-target.jpg" alt="Q 目标"/>

然而问题在于,我们用同一组参数(权重)来估计 TD 目标**和** Q 值。因此,TD 目标与我们正在更新的参数之间存在很强的相关性。

于是,在训练的每一步,**我们的 Q 值和目标值都在移动**。我们正在接近目标,但目标本身也在移动。这就像在追逐一个移动的靶子!这会导致训练中出现显著的振荡。

这就好比你是一个牛仔(Q 的估计),想要抓住一头牛(Q 目标)。你的目标是离它更近(减小误差)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/qtarget-1.jpg" alt="Q 目标"/>

在每个时间步,你都试图靠近牛,而牛也在每个时间步移动(因为你使用了相同的参数)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/qtarget-2.jpg" alt="Q 目标"/>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/qtarget-3.jpg" alt="Q 目标"/>
这导致了一条怪异的追逐轨迹(训练中的显著振荡)。
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/qtarget-4.jpg" alt="Q 目标"/>

相反,我们在伪代码中看到的是:
- 使用一个**参数固定的独立网络**来估计 TD 目标
- **每 C 步从深度 Q 网络复制一次参数**,以更新目标网络。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/fixed-q-target-pseudocode.jpg" alt="固定 Q 目标伪代码"/>



## Double DQN(双重 DQN)

Double DQN,即 Double Deep Q-Learning 神经网络,由 [Hado van Hasselt](https://papers.nips.cc/paper/3964-double-q-learning) 提出。这种方法**解决了 Q 值高估的问题**。

要理解这个问题,先回忆一下我们是如何计算 TD 目标的:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/TD-1.jpg" alt="TD 目标"/>

在计算 TD 目标时,我们面临一个简单的问题:我们如何确定**下一状态的最佳动作就是 Q 值最高的那个动作**?

我们知道,Q 值的准确性取决于我们尝试过哪些动作,**以及**探索过哪些相邻状态。

因此,在训练初期,我们对最佳动作缺乏足够的信息。于是,把最大 Q 值(它含有噪声)当作最佳动作可能导致误判。如果非最优动作经常**获得比最优动作更高的 Q 值,学习就会变得困难**。

解决方案是:在计算 Q 目标时,我们使用两个网络来解耦动作选择与目标 Q 值的生成。我们:
- 用**DQN 网络**为下一状态选择要执行的最佳动作(Q 值最高的那个动作)。
- 用**目标网络**计算在下一状态执行该动作的目标 Q 值。

因此,Double DQN 帮助我们减少 Q 值的高估,从而帮助我们更快地训练,学习也更加稳定。

自深度 Q 学习的这三项改进之后,人们又陆续提出了许多改进,例如优先经验回放(Prioritized Experience Replay)和决斗深度 Q 学习(Dueling Deep Q-Learning)。它们超出了本课程的范围,但如果你感兴趣,可以查看我们放在阅读清单中的链接。
