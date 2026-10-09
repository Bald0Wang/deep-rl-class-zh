> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit5/curiosity.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit5/curiosity.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# （可选）深度强化学习中的好奇心是什么？

这是一份（可选的）关于好奇心（Curiosity）的介绍。如果你想了解更多，可以阅读下面两篇补充文章，我们会在其中深入探讨数学细节：

- [通过下一状态预测实现好奇心驱动学习](https://medium.com/data-from-the-trenches/curiosity-driven-learning-through-next-state-prediction-f7f4e2f592fa)
- [随机网络蒸馏：好奇心驱动学习的新尝试](https://medium.com/data-from-the-trenches/curiosity-driven-learning-through-random-network-distillation-488ffd8e5938)

## 现代 RL 的两大难题

要理解什么是好奇心，我们首先需要理解 RL 的两大难题：

第一个是*稀疏奖励问题（sparse rewards problem）*：也就是说，**大多数奖励不包含任何信息，因此被设为零**。

请记住，RL 建立在*奖励假说（reward hypothesis）*之上，即每个目标都可以描述为奖励的最大化。因此，奖励充当 RL 智能体的反馈；**如果智能体得不到任何奖励，它对哪个动作合适（或不合适）的认知就无法改变**。


<figure>
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit5/curiosity1.png" alt="好奇心"/>
<figcaption>来源：多亏了这个奖励，我们的智能体知道在该状态下采取这个动作是好的</figcaption>
</figure>


例如，在基于游戏 Doom 的环境集 [Vizdoom](https://vizdoom.cs.put.edu.pl/) 中的 "DoomMyWayHome" 里，只有**当智能体找到背心（vest）时它才会获得奖励**。
然而，背心距离起点很远，因此大多数奖励都会是零。这样一来，如果我们的智能体接收不到有用的反馈（密集奖励），它就需要长得多的时间才能学到一个最优策略，而且**它可能会一直原地打转，却始终找不到目标**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit5/curiosity2.png" alt="好奇心"/>

第二个大问题是，**外在奖励（extrinsic reward）函数是手工设计的；在每一个环境中，都需要由人来实现一个奖励函数**。但在大型且复杂的环境中，我们如何将这种做法规模化呢？

## 那么，什么是好奇心？

解决这些问题的一种方案是**开发一种智能体内在的奖励函数，也就是由智能体自身生成的奖励函数**。此时智能体将成为一个自主学习者：它既是学生，又是给自己提供反馈的导师。

**这种内在奖励机制被称为好奇心（Curiosity）**，因为这种奖励会推动智能体去探索新颖/陌生的状态。为此，当我们的智能体探索新轨迹时，它会获得较高的奖励。

这种奖励的灵感来自人类的行为方式。**我们天生就有一种探索环境、发现新事物的内在欲望**。

计算这种内在奖励有多种方法。经典做法（通过下一状态预测计算好奇心）是把好奇心计算为**在给定当前状态和所采取动作的情况下，智能体预测下一状态的误差**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit5/curiosity3.png" alt="好奇心"/>

因为好奇心的核心思想是**鼓励我们的智能体采取那些能降低"预测自身动作后果"之不确定性的动作**（在智能体停留较少的区域，或动力学复杂的区域，不确定性会更高）。

如果智能体在这些状态上花费了大量时间，它就会很擅长预测下一状态（好奇心低）。相反，如果它处于一个全新的、未被探索过的状态，预测接下来的状态就会很困难（好奇心高）。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit5/curiosity4.png" alt="好奇心"/>

利用好奇心会推动我们的智能体偏爱那些预测误差高的状态转移（在智能体停留较少的区域或动力学复杂的区域，误差会更高），从而**更好地探索我们的环境**。

此外还有**其他计算好奇心的方法**。ML-Agents 使用一种更高级的方法，称为通过随机网络蒸馏（random network distillation）计算好奇心。这超出了本教程的范围，但如果你感兴趣，[我写过一篇文章详细解释了它](https://medium.com/data-from-the-trenches/curiosity-driven-learning-through-random-network-distillation-488ffd8e5938)。
