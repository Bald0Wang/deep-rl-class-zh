> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit2/q-learning-example.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit2/q-learning-example.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 一个 Q-Learning 示例

为了更好地理解 Q-Learning,我们来看一个简单的例子:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Maze-Example-2.jpg" alt="Maze-Example"/>

- 你是这个小迷宫里的一只老鼠。你总是**从同一个起点出发**。
- 目标是**吃掉右下角的那一大堆奶酪**,并避开毒药。毕竟,谁不喜欢奶酪呢?
- 如果我们吃到毒药、**吃掉那一大堆奶酪**,或者走了超过五步,回合就会结束。
- 学习率为 0.1
- 折扣率(gamma)为 0.99

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-ex-1.jpg" alt="Maze-Example"/>


奖励函数如下:

- **+0:** 进入一个没有奶酪的状态。
- **+1:** 进入一个有一小块奶酪的状态。
- **+10:** 进入有那一大堆奶酪的状态。
- **-10:** 进入有毒药的状态,因此死亡。
- **+0** 如果我们走了超过五步。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-ex-2.jpg" alt="Maze-Example"/>

为了训练我们的智能体获得最优策略(即"右、右、下"这样的策略),**我们将使用 Q-Learning 算法**。

## 第 1 步:初始化 Q 表

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Example-1.jpg" alt="Maze-Example"/>

就目前而言,**我们的 Q 表毫无用处**;我们需要**用 Q-Learning 算法来训练我们的 Q 函数**。

我们来完成 2 个训练时间步:

训练时间步 1:

## 第 2 步:使用 epsilon-贪婪策略选择动作

由于 epsilon 很大(= 1.0),我采取一个随机动作。在这个例子里,我向右走。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-ex-3.jpg" alt="Maze-Example"/>


## 第 3 步:执行动作 At,得到 Rt+1 和 St+1

向右走之后,我得到了一小块奶酪,所以 \\(R_{t+1} = 1\\),并且我进入了一个新状态。


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-ex-4.jpg" alt="Maze-Example"/>


## 第 4 步:更新 Q(St, At)

现在我们可以用公式来更新 \\(Q(S_t, A_t)\\) 了。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-ex-5.jpg" alt="Maze-Example"/>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/Example-4.jpg" alt="Maze-Example"/>

训练时间步 2:

## 第 2 步:使用 epsilon-贪婪策略选择动作

**我再次采取随机动作,因为 epsilon=0.99 仍然很大**。(注意我们对 epsilon 做了一点衰减,因为随着训练的进行,我们希望探索越来越少)。

我选择了"向下"这个动作。**这不是一个好动作,因为它把我引向了毒药。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-ex-6.jpg" alt="Maze-Example"/>


## 第 3 步:执行动作 At,得到 Rt+1 和 St+1

因为吃了毒药,**我得到 \\(R_{t+1} = -10\\),然后我就死了。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-ex-7.jpg" alt="Maze-Example"/>

## 第 4 步:更新 Q(St, At)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit3/q-ex-8.jpg" alt="Maze-Example"/>

因为我们死了,所以会开始一个新回合。但我们在这里看到的是,**仅仅两次探索步骤,我的智能体就变得更聪明了。**

随着我们继续探索与利用环境,并使用 TD 目标更新 Q 值,**Q 表会给出越来越好的近似。在训练结束时,我们将得到最优 Q 函数的一个估计。**
