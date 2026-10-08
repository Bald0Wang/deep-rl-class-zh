> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit4/pg-theorem.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit4/pg-theorem.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# (选修)策略梯度定理

在这一选学章节中,我们将**研究如何对我们用来近似策略梯度的目标函数(objective function)求导**。

我们先来回顾一下各个公式:

1. 目标函数

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/expected_reward.png" alt="Return"/>


2. 一条轨迹(trajectory)的概率(假设动作来自 \\(\pi_\theta\\)):

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/probability.png" alt="Probability"/>


于是我们有:

\\(\nabla_\theta J(\theta) =  \nabla_\theta \sum_{\tau}P(\tau;\theta)R(\tau)\\)


我们可以把"和的梯度"改写为"梯度的和":

\\( =  \sum_{\tau} \nabla_\theta (P(\tau;\theta)R(\tau)) = \sum_{\tau} \nabla_\theta P(\tau;\theta)R(\tau) \\),因为 \\(R(\tau)\\) 不依赖于 \\(\theta\\)

接下来,我们给和式中的每一项乘上 \\(\frac{P(\tau;\theta)}{P(\tau;\theta)}\\)(这是允许的,因为它等于 1):

\\( = \sum_{\tau} \frac{P(\tau;\theta)}{P(\tau;\theta)}\nabla_\theta P(\tau;\theta)R(\tau) \\)


由于 \\( \frac{P(\tau;\theta)}{P(\tau;\theta)}\nabla_\theta P(\tau;\theta) =  P(\tau;\theta)\frac{\nabla_\theta P(\tau;\theta)}{P(\tau;\theta)}  \\),我们还可以进一步化简。

于是我们可以把这个和改写为

\\( P(\tau;\theta)\frac{\nabla_\theta P(\tau;\theta)}{P(\tau;\theta)}= \sum_{\tau} P(\tau;\theta) \frac{\nabla_\theta P(\tau;\theta)}{P(\tau;\theta)}R(\tau) \\)

接着,我们可以使用*对数求导技巧*(*derivative log trick*,也称*似然比技巧*(*likelihood ratio trick*)或 *REINFORCE 技巧*),这是微积分中的一条简单法则:\\( \nabla_x log f(x) = \frac{\nabla_x f(x)}{f(x)} \\)

既然我们手里有 \\(\frac{\nabla_\theta P(\tau;\theta)}{P(\tau;\theta)} \\),就可以把它变换为 \\(\nabla_\theta log P(\tau|\theta) \\)



这就是我们的似然策略梯度:

\\( \nabla_\theta J(\theta) = \sum_{\tau} P(\tau;\theta)  \nabla_\theta log P(\tau;\theta) R(\tau) \\)

得益于这个新公式,我们可以用轨迹样本来估计梯度了(如果你愿意,也可以说是用基于样本的估计来近似似然比策略梯度)。

\\(\nabla_\theta J(\theta) = \frac{1}{m} \sum^{m}_{i=1} \nabla_\theta log P(\tau^{(i)};\theta)R(\tau^{(i)})\\),其中每个 \\(\tau^{(i)}\\) 都是一条采样得到的轨迹。


不过,这里的数学推导还没有结束:我们还需要化简 \\(  \nabla_\theta log P(\tau|\theta) \\)

我们知道:

\\(\nabla_\theta log P(\tau^{(i)};\theta)= \nabla_\theta log[ \mu(s_0) \prod_{t=0}^{H} P(s_{t+1}^{(i)}|s_{t}^{(i)}, a_{t}^{(i)}) \pi_\theta(a_{t}^{(i)}|s_{t}^{(i)})]\\)

其中 \\(\mu(s_0)\\) 是初始状态分布,\\( P(s_{t+1}^{(i)}|s_{t}^{(i)}, a_{t}^{(i)})  \\) 是 MDP 的状态转移动力学。

我们知道,乘积的对数等于对数之和:

\\(\nabla_\theta log P(\tau^{(i)};\theta)= \nabla_\theta \left[log \mu(s_0) + \sum\limits_{t=0}^{H}log P(s_{t+1}^{(i)}|s_{t}^{(i)} a_{t}^{(i)}) + \sum\limits_{t=0}^{H}log \pi_\theta(a_{t}^{(i)}|s_{t}^{(i)})\right] \\)

我们还知道,和的梯度等于梯度之和:

\\( \nabla_\theta log P(\tau^{(i)};\theta)=\nabla_\theta log\mu(s_0) + \nabla_\theta \sum\limits_{t=0}^{H} log P(s_{t+1}^{(i)}|s_{t}^{(i)} a_{t}^{(i)}) + \nabla_\theta \sum\limits_{t=0}^{H} log \pi_\theta(a_{t}^{(i)}|s_{t}^{(i)}) \\)


由于初始状态分布和 MDP 的状态转移动力学都不依赖于 \\(\theta\\),这两项的导数都为 0,因此可以把它们去掉:

由于:
\\(\nabla_\theta \sum_{t=0}^{H} log P(s_{t+1}^{(i)}|s_{t}^{(i)}  a_{t}^{(i)}) = 0 \\) 且 \\( \nabla_\theta \mu(s_0) = 0\\)

\\(\nabla_\theta log P(\tau^{(i)};\theta) =   \nabla_\theta \sum_{t=0}^{H} log \pi_\theta(a_{t}^{(i)}|s_{t}^{(i)})\\)

我们可以把"和的梯度"改写为"梯度之和":

\\( \nabla_\theta log P(\tau^{(i)};\theta)=    \sum_{t=0}^{H} \nabla_\theta log \pi_\theta(a_{t}^{(i)}|s_{t}^{(i)}) \\)

于是,估计策略梯度的最终公式为:

\\( \nabla_{\theta} J(\theta) = \hat{g} = \frac{1}{m} \sum^{m}_{i=1} \sum^{H}_{t=0} \nabla_\theta \log \pi_\theta(a^{(i)}_{t} | s_{t}^{(i)})R(\tau^{(i)}) \\)
