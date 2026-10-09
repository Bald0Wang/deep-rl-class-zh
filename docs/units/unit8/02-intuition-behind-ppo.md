> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit8/intuition-behind-ppo.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit8/intuition-behind-ppo.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# PPO 背后的直觉

近端策略优化(Proximal Policy Optimization,PPO)的核心思想是:通过限制每个训练轮次(epoch)对策略(policy)所做的改动,来提升策略训练的稳定性:**我们要避免出现过大的策略更新。**

原因有两点:
- 经验表明,训练中较小的策略更新**更有可能收敛到最优解。**
- 策略更新时步子迈得太大,可能会导致"跌落悬崖"(得到一个糟糕的策略),**而且需要很长时间才能恢复,甚至可能永远无法恢复。**

<figure class="image table text-center m-0 w-full">
  <img class="center" src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/cliff.jpg" alt="策略更新悬崖"/>
  <figcaption>采取更小的策略更新,以提升训练的稳定性</figcaption>
  <figcaption>图片修改自 <a href="https://jonathan-hui.medium.com/rl-proximal-policy-optimization-ppo-explained-77f014ec3f12">RL — Proximal Policy Optimization (PPO) 详解,作者 Jonathan Hui</a></figcaption>
</figure>

**因此在 PPO 中,我们以保守的方式更新策略**。为此,我们需要通过在当前策略与旧策略之间计算一个比率,来衡量当前策略相对旧策略改变了多少。然后,我们把这个比率裁剪到范围 \( [1 - \epsilon, 1 + \epsilon] \) 内,这意味着我们**消除了当前策略过度偏离旧策略的激励("近端/proximal"一词由此而来)。**
