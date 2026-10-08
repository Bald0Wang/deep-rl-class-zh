> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit4/policy-gradient.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit4/policy-gradient.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 深入了解策略梯度方法

## 把握整体图景

我们刚刚学到,策略梯度方法的目标是找到**能使期望回报(expected return)最大化**的参数 \\( \theta \\)。

其思想是我们拥有一个*参数化的随机策略*。在我们的场景中,神经网络输出动作上的概率分布。采取每个动作的概率也被称为*动作偏好*(action preference)。

以 CartPole-v1(倒立摆)为例:
- 输入是一个状态。
- 输出是该状态下动作的概率分布。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/policy_based.png" alt="策略方法" />

策略梯度的目标是**控制动作的概率分布**:调整策略,使得**好动作(能最大化回报的动作)在未来被采样得更频繁。**
智能体每次与环境交互,我们都微调参数,让好动作在未来更有可能被采样到。

但是,**我们要如何利用期望回报来优化权重呢**?

思路是:**让智能体在一个回合(episode)中交互**。如果我们赢下了这个回合,我们就认为这回合中采取的每个动作都是好动作,未来应当被更多地采样,
因为它们带来了胜利。

于是,对每个状态-动作对,我们想提高 \\(P(a|s)\\):在该状态下采取该动作的概率。如果输了,就降低它。

策略梯度算法(简化版)如下所示:
<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/pg_bigpicture.jpg" alt="策略梯度全景图"/>
</figure>

了解了整体图景之后,我们来深入探究策略梯度方法。

## 深入了解策略梯度方法

我们有随机策略 \\(\pi\\),它带有参数 \\(\theta\\)。给定一个状态,这个 \\(\pi\\) 会**输出动作的概率分布**。

<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/stochastic_policy.png" alt="策略"/>
</figure>

其中 \\(\pi_\theta(a_t|s_t)\\) 表示在我们的策略下,智能体从状态 \\(s_t\\) 选择动作 \\(a_t\\) 的概率。

**但我们怎么知道策略好不好呢?** 我们需要一种度量方法。为此,我们定义一个得分函数/目标函数,记作 \\(J(\theta)\\)。

### 目标函数

*目标函数*告诉我们:给定一条轨迹(trajectory,即不考虑奖励的状态-动作序列,这一点与回合不同),智能体的**表现如何**,并输出*期望累积奖励*。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/objective.jpg" alt="回报"/>

进一步拆解这个公式:
- *期望回报*(expected return,也称期望累积奖励),是回报 \\(R(\tau)\\) 所有可能取值的加权平均(权重由 \\(P(\tau;\theta)\\) 给出)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/expected_reward.png" alt="回报"/>


- \\(R(\tau)\\):某条任意轨迹的回报。要用这个量来计算期望回报,需要将它乘以每条可能轨迹的概率。

- \\(P(\tau;\theta)\\):每条可能轨迹 \\(\tau\\) 出现的概率(该概率依赖于 \\(\theta\\),因为 \\(\theta\\) 定义了用来选择轨迹中动作的策略,而这又会影响所访问到的状态)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/probability.png" alt="概率"/>

- \\(J(\theta)\\):期望回报。对每条轨迹,用"在给定 \\(\theta \\) 下采取该轨迹的概率"乘以"该轨迹的回报",再对所有轨迹求和,就得到它。

于是,我们的目标就是找到能输出最佳动作概率分布的 \\(\theta \\),从而最大化期望累积奖励:


<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/max_objective.png" alt="最大化目标"/>


## 梯度上升与策略梯度定理

策略梯度是一个优化问题:我们想找到使目标函数 \\(J(\theta)\\) 最大化的 \\(\theta\\) 值,因此需要使用**梯度上升(gradient ascent)**。它与*梯度下降(gradient descent)*方向相反,因为它给出的是 \\(J(\theta)\\) 增长最陡的方向。

(如果你想温习梯度下降与梯度上升的区别,可以看看[这篇](https://www.baeldung.com/cs/gradient-descent-vs-ascent)和[这篇](https://stats.stackexchange.com/questions/258721/gradient-ascent-vs-gradient-descent-in-logistic-regression)。)

梯度上升的更新步骤为:

\\( \theta \leftarrow \theta + \alpha *  \nabla_\theta J(\theta) \\)

我们可以反复应用这一更新,期望 \\(\theta \\) 收敛到使 \\(J(\theta)\\) 最大化的值。

然而,计算 \\(J(\theta)\\) 的导数存在两个问题:
1. 我们无法计算目标函数的真实梯度,因为这需要计算每条可能轨迹的概率,计算开销极其巨大。
所以我们想**用基于样本的估计来计算梯度的近似值(采集一些轨迹)**。

2. 还有另一个问题,我会在下一节(选读)中解释。要对这个目标函数求导,我们需要对状态分布求导,这个状态分布被称为马尔可夫决策过程(Markov Decision Process)的动力学(dynamics)。它与环境绑定,告诉我们:在给定当前状态和智能体所采取动作的情况下,环境转移到下一个状态的概率。问题在于,我们可能根本不知道这个分布,因此无法对它求导。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/probability.png" alt="概率"/>

幸运的是,我们将使用一个名为策略梯度定理(Policy Gradient Theorem)的解决方案,它帮助我们把目标函数重新表述成一个可微函数,其中不再涉及对状态分布的求导。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/policy_gradient_theorem.png" alt="策略梯度"/>

如果你想了解这个梯度近似公式是如何推导出来的,请看下一节(选读)。

## Reinforce 算法(蒙特卡洛 Reinforce)

Reinforce 算法,也称为蒙特卡洛策略梯度(Monte-Carlo policy-gradient),是一种策略梯度算法,它**利用从整个回合估计出的回报来更新策略参数** \\(\theta\\):

在一个循环中:
- 使用策略 \\(\pi_\theta\\) 采集一个回合 \\(\tau\\)
- 用这个回合来估计梯度 \\(\hat{g} = \nabla_\theta J(\theta)\\)

 <figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/policy_gradient_one.png" alt="策略梯度"/>
</figure>

- 更新策略的权重:\\(\theta \leftarrow \theta + \alpha \hat{g}\\)

我们可以这样解读这个更新:

- \\(\nabla_\theta log \pi_\theta(a_t|s_t)\\) 是"从状态 \\(s_t\\) 选择动作 \\(a_t\\) 的(对数)概率"**上升最陡的方向**。
它告诉我们:如果想提高/降低在状态 \\(s_t\\) 选择动作 \\(a_t\\) 的对数概率,**应当如何调整策略的权重**。

- \\(R(\tau)\\):是得分函数(score function):
  - 如果回报很高,它会**推高**这些(状态, 动作)组合的概率。
  - 反之,如果回报很低,它会**压低**这些(状态, 动作)组合的概率。


我们还可以**采集多个回合(轨迹)**来估计梯度:
<figure class="image table text-center m-0 w-full">
 <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit6/policy_gradient_multiple.png" alt="策略梯度"/>
</figure>
