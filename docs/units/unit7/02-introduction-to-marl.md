> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit7/introduction-to-marl.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit7/introduction-to-marl.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 多智能体强化学习(MARL)入门

## 从单智能体到多智能体

在第一单元中,我们学习了如何在单智能体系统中训练智能体。当时我们的智能体独自处在环境中:**它不与其他智能体合作或协作**。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/patchwork.jpg" alt="Patchwork"/>
<figcaption>
课程开始至今你训练智能体所用的所有环境的拼图
</figcaption>
</figure>

当我们进行多智能体强化学习(Multi-Agents Reinforcement Learning, MARL)时,面对的情形是:有多个智能体**在同一个环境中共享空间并相互交互**。

举个例子,你可以想象一个仓库,**多个机器人需要导航去装载和卸载包裹**。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/warehouse.jpg" alt="Warehouse"/>
<figcaption> [图片来源:upklyak](https://www.freepik.com/free-vector/robots-warehouse-interior-automated-machines_32117680.htm#query=warehouse robot&position=17&from_view=keyword),来自 Freepik </figcaption>
</figure>

或者一条有多辆**自动驾驶汽车**的马路。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/selfdrivingcar.jpg" alt="Self driving cars"/>
<figcaption>
[图片来源:jcomp](https://www.freepik.com/free-vector/autonomous-smart-car-automatic-wireless-sensor-driving-road-around-car-autonomous-smart-car-goes-scans-roads-observe-distance-automatic-braking-system_26413332.htm#query=self driving cars highway&position=34&from_view=search&track=ais),来自 Freepik
</figcaption>
</figure>

在这些例子中,我们有**多个智能体在环境中相互之间以及与环境进行交互**。这就意味着我们需要定义一个多智能体系统。但首先,让我们来了解一下多智能体环境的不同类型。

## 多智能体环境的不同类型

既然在多智能体系统中,智能体要与其他智能体交互,我们就会遇到不同类型的环境:

- *合作环境(Cooperative environments)*:你的智能体需要**最大化共同收益**。

例如,在仓库中,**机器人必须协作,以高效地(尽可能快地)装卸包裹**。

- *竞争/对抗环境(Competitive/Adversarial environments)*:在这种情况下,你的智能体**希望通过最小化对手的收益来最大化自己的收益**。

比如在一场网球比赛中,**每个智能体都想击败对方**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/tennis.png" alt="Tennis"/>

- *对抗与合作兼有*:就像我们的 SoccerTwos(双人足球)环境一样,两个智能体同属一支球队(蓝色或紫色):它们既需要彼此合作,又要击败对方球队。

<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit10/soccertwos.gif" alt="SoccerTwos"/>
<figcaption>该环境由 <a href="https://github.com/Unity-Technologies/ml-agents">Unity MLAgents Team</a> 制作</figcaption>
</figure>

那么我们现在可能会问:如何设计这些多智能体系统?换句话说,**我们如何才能在多智能体环境中训练智能体**?
