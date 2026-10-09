> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit8/clipped-surrogate-objective.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit8/clipped-surrogate-objective.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 裁剪代理目标函数(Clipped Surrogate Objective Function)简介
## 回顾:策略目标函数

让我们回忆一下,在 Reinforce 中要优化的目标是什么:
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/lpg.jpg" alt="Reinforce"/>

其思路是:对这一函数做一步梯度上升(等价于对该函数的相反数做梯度下降),**就能促使我们的智能体(agent)采取能带来更高奖励的动作,并避免有害的动作。**

然而,问题出在步长上:
- 太小,**训练过程太慢**
- 太大,**训练中的波动太大**

而 PPO 的思路是,用一个叫做*裁剪代理目标函数(Clipped Surrogate Objective Function)*的新目标函数来约束我们的策略(policy)更新,它**通过裁剪(clip)把策略的变化限制在一个小范围内。**

这个新函数**旨在避免破坏性的大幅权重更新**:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/ppo-surrogate.jpg" alt="PPO 代理目标函数"/>

下面我们逐一研究它的各个部分,以理解其工作原理。

## 比率函数
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/ratio1.jpg" alt="比率"/>

这个比率的计算方式如下:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/ratio2.jpg" alt="比率"/>

它就是:在当前策略下,于状态 \\( s_t \\) 处采取动作 \\( a_t \\) 的概率,除以上一个策略在相同情况下的概率。

可以看到,\\( r_t(\theta) \\) 表示当前策略与旧策略之间的概率比率(probability ratio):

- 如果 \\( r_t(\theta) > 1 \\),说明**在当前策略下,于状态 \\( s_t \\) 处采取动作 \\( a_t \\) 的可能性比旧策略更大。**
- 如果 \\( r_t(\theta) \\) 介于 0 和 1 之间,说明**当前策略采取该动作的可能性比旧策略更低**。

因此,这个概率比率是**一种估计旧策略与当前策略之间差异的简便方法。**

## 裁剪代理目标函数中未裁剪的部分
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/unclipped1.jpg" alt="PPO"/>

这个比率**可以取代我们在策略目标函数中使用的对数概率**。这就得到了新目标函数的左半部分:用比率乘以优势(advantage)。
<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/unclipped2.jpg" alt="PPO"/>
  <figcaption><a href="https://arxiv.org/pdf/1707.06347.pdf">Proximal Policy Optimization Algorithms</a></figcaption>
</figure>

然而,如果不加约束,当所采取的动作在当前策略下的概率远大于旧策略时,**这会导致一次很大的策略梯度(policy gradient)步长**,进而造成**过度的策略更新。**

## 裁剪代理目标函数中裁剪的部分

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/clipped.jpg" alt="PPO"/>

因此,我们需要约束这个目标函数,对那些导致比率远离 1 的变化进行惩罚(在论文中,比率只能在 0.8 到 1.2 之间变化)。

**通过裁剪比率,我们确保策略更新不会过大,因为当前策略不可能与旧策略相差太多。**

为此,我们有两种解决方案:

- *TRPO(信赖域策略优化,Trust Region Policy Optimization)*在目标函数之外使用 KL 散度约束来限制策略更新。但这种方法**实现复杂,且计算耗时更长。**
- *PPO* 则直接在目标函数中裁剪概率比率,也就是它的**裁剪代理目标函数。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/clipped.jpg" alt="PPO"/>

这个裁剪部分是 \\( r_t(\theta) \\) 被裁剪在 \\( [1 - \epsilon, 1 + \epsilon] \\) 之间的版本。

有了裁剪代理目标函数,我们就有两个概率比率:一个未裁剪,另一个被裁剪在 \\( [1 - \epsilon, 1 + \epsilon] \\) 范围内。epsilon 是一个超参数,帮助我们定义这个裁剪范围(论文中 \\( \epsilon = 0.2 \\))。

然后,我们取裁剪后目标与未裁剪目标二者中的最小值,**因此最终目标是未裁剪目标的一个下界(悲观界)。**

取二者的最小值意味着,**我们会根据比率和优势的具体情况,在裁剪后的目标与未裁剪的目标之间做出选择**。
