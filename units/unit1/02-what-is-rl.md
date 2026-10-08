> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit1/what-is-rl.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit1/what-is-rl.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 什么是强化学习?

要理解强化学习,我们先从全局视角开始。

## 全局视角

强化学习背后的思想是:智能体(agent,即一个 AI)会从环境中学习,**通过与它交互**(经由试错),并**接收奖励**(负的或正的)作为执行动作的反馈。

这种通过与环境的交互来学习的方式,**源自我们与生俱来的自然经验。**

举个例子,想象你把弟弟放在一个他从未玩过的电子游戏前,递给他一个游戏手柄,然后留他一个人玩。


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/Illustration_1.jpg" alt="插图 1" width="100%">

你的弟弟会通过按下右侧按钮(动作)与环境(电子游戏)交互。他吃到了一枚金币,这就是 +1 奖励。这是正面的,他刚刚明白:在这个游戏里**他必须收集金币。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/Illustration_2.jpg" alt="插图 2" width="100%">

但随后,**他又按了一次右侧按钮**,碰到了敌人。他刚刚死掉了,所以这是一个 -1 奖励。


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/Illustration_3.jpg" alt="插图 3" width="100%">

通过与环境进行试错式的交互,你的弟弟明白了**在这个环境中,他既要收集金币,又要躲避敌人。**

**在没有任何监督的情况下**,这个孩子会越玩越好。

人类和动物就是这样学习的:**通过交互来学习。**强化学习只不过是一种**从动作中学习的计算方法。**


### 形式化定义

现在我们可以给出一个正式的定义:

<Tip>
强化学习是一种解决控制任务(也称为决策问题)的框架:它通过构建智能体来解决问题,这些智能体通过试错与环境交互,并接收奖励(正的或负的)作为唯一反馈,从而从环境中学习。
</Tip>

那么,强化学习究竟是如何工作的呢?
