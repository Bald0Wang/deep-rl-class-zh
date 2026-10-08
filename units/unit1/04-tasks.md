> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit1/tasks.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit1/tasks.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 任务的类型

任务是强化学习问题的一个**实例**。我们可以有两种类型的任务:**回合型(episodic)**和**持续型(continuing)**。

## 回合型任务

在这种情况下,我们有一个起点和一个终点**(终止状态(terminal state)),这就构成了一个回合(episode)**:一个由状态、动作、奖励和新状态组成的列表。

例如,想想 Super Mario Bros:一个回合从新的 Mario 关卡开始时启动,**当你被杀死或到达关卡尽头时结束。**

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/mario.jpg" alt="Super Mario Bros">
<figcaption>新回合的开始。
</figcaption>
</figure>


## 持续型任务

这类任务会永远持续下去(**没有终止状态**)。在这种情况下,智能体必须**学会如何选择最佳动作,同时与环境持续交互。**

例如,一个进行自动化股票交易的智能体。对于这个任务,没有起点和终止状态。**智能体会一直运行,直到我们决定让它停下。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/stock.jpg" alt="股票市场" width="100%">

总结一下:
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit1/tasks.jpg" alt="任务总结" width="100%">
