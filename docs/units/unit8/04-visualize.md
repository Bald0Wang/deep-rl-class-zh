> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit8/visualize.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit8/visualize.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 可视化裁剪代理目标函数

别担心。**现在觉得这些内容难以消化是很正常的**。接下来我们看看这个裁剪代理目标函数(Clipped Surrogate Objective Function)长什么样,这会帮助你更直观地理解其中发生了什么。

<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/recap.jpg" alt="PPO"/>
  <figcaption><a href="https://fse.studenttheses.ub.rug.nl/25709/1/mAI_2021_BickD.pdf">表格来自 Daniel Bick 的《Towards Delivering a Coherent Self-Contained Explanation of Proximal Policy Optimization》</a></figcaption>
</figure>

这里有六种不同的情况。首先要记住:我们取的是裁剪后目标与未裁剪目标之间的最小值。

## 情况 1 和 2:比率处于范围之内

在情况 1 和 2 中,**由于比率处于范围** \( [1 - \epsilon, 1 + \epsilon] \) **之内,裁剪并不生效。**

在情况 1 中,优势(advantage)为正:**该动作优于该状态下所有动作的平均水平**。因此,我们应该鼓励当前策略提高在该状态下采取该动作的概率。

由于比率处于区间之内,**我们可以提高策略在该状态下采取该动作的概率。**

在情况 2 中,优势为负:该动作比该状态下所有动作的平均水平更差。因此,我们应该抑制当前策略在该状态下采取该动作。

由于比率处于区间之内,**我们可以降低策略在该状态下采取该动作的概率。**

## 情况 3 和 4:比率低于范围
<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/recap.jpg" alt="PPO"/>
  <figcaption><a href="https://fse.studenttheses.ub.rug.nl/25709/1/mAI_2021_BickD.pdf">表格来自 Daniel Bick 的《Towards Delivering a Coherent Self-Contained Explanation of Proximal Policy Optimization》</a></figcaption>
</figure>

如果概率比率(probability ratio)低于 \( [1 - \epsilon] \),说明在该状态采取该动作的概率远低于旧策略下的概率。

如果像情况 3 那样,优势估计为正(A>0),那么**你想提高在该状态采取该动作的概率。**

但如果像情况 4 那样,优势估计为负,**我们就不想再进一步降低**在该状态采取该动作的概率了。因此,梯度 = 0(因为我们处在一段水平线上),所以我们不更新权重。

## 情况 5 和 6:比率高于范围
<figure class="image table text-center m-0 w-full">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/recap.jpg" alt="PPO"/>
  <figcaption><a href="https://fse.studenttheses.ub.rug.nl/25709/1/mAI_2021_BickD.pdf">表格来自 Daniel Bick 的《Towards Delivering a Coherent Self-Contained Explanation of Proximal Policy Optimization》</a></figcaption>
</figure>

如果概率比率高于 \( [1 + \epsilon] \),说明当前策略在该状态采取该动作的概率**远高于旧策略。**

如果像情况 5 那样优势为正,**我们不想变得过于贪心**。当前策略在该状态采取该动作的概率已经比旧策略高了。因此,梯度 = 0(因为我们处在一段水平线上),所以我们不更新权重。

如果像情况 6 那样优势为负,我们就希望降低在该状态采取该动作的概率。

总结一下:**我们只根据未裁剪的目标部分来更新策略**。当最小值是裁剪后的目标部分时,由于梯度将等于 0,我们不会更新策略的权重。

因此,只有满足以下情况时,我们才会更新策略:
- 比率处于范围 \( [1 - \epsilon, 1 + \epsilon] \) 内
- 比率在范围之外,但**优势会推动比率向范围靠近**
    - 比率低于范围,但优势 > 0
    - 比率高于范围,但优势 < 0

**你可能会问:为什么当最小值是裁剪后的比率时,梯度是 0?**当比率被裁剪时,此时的导数将不再是 \( r_t(\theta) * A_t \) 的导数,而是 \( (1 - \epsilon)* A_t\) 或 \( (1 + \epsilon)* A_t\) 的导数,而这两者都等于 0。


总而言之,得益于这个裁剪代理目标,**我们限制了当前策略相对旧策略可以变化的空间。**因为我们消除了概率比率移出区间的激励——裁剪会迫使梯度变为零。如果比率 > \( 1 + \epsilon \) 或 < \( 1 - \epsilon \),梯度就会等于 0。

PPO Actor-Critic 风格下最终的裁剪代理目标损失如下所示,它由裁剪代理目标函数、价值损失函数(Value Loss Function)和熵奖励(entropy bonus)组合而成:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/ppo-objective.jpg" alt="PPO 目标函数"/>

这部分内容相当复杂。请花些时间,对照表格和图像来理解这几种情况。**你必须理解这背后的道理。**如果你想深入了解,最好的资料是 Daniel Bick 的文章[《Towards Delivering a Coherent Self-Contained Explanation of Proximal Policy Optimization》,尤其是第 3.4 节](https://fse.studenttheses.ub.rug.nl/25709/1/mAI_2021_BickD.pdf)。
