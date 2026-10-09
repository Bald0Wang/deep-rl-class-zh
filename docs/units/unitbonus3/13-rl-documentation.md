> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus3/rl-documentation.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus3/rl-documentation.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 强化学习文档简介

在这个进阶专题中,我们探讨这样一个问题:**对于我们在真实世界中训练、并与人类交互的强大强化学习智能体,我们应该如何监控和追踪它们?**

随着机器学习系统对现代生活的影响越来越大,**对这些系统进行文档化(documentation)的呼声也日益高涨**。

这类文档可以涵盖多个方面,例如所使用的训练数据——存储在哪里、何时收集、有哪些人参与等等——或者模型优化框架——架构、评估指标、相关论文等等——以及其他更多内容。

如今,模型卡(model cards)和数据表(datasheets)正变得越来越普及,例如在 Hub 上(相关文档见[这里](https://huggingface.co/docs/hub/model-cards))。

如果你点击 [Hub 上的一个热门模型](https://huggingface.co/models),就可以了解它的创建过程。

这些针对模型和数据的记录被设计为在模型或数据集创建时填写,而当这些模型将来被集成到不断演化的系统中时,它们往往不会随之更新。

## 为什么需要奖励报告(Reward Reports)

强化学习系统从本质上说,就是基于奖励(reward)和时间的度量来进行优化的。虽然奖励函数的概念可以很好地映射到许多已被充分理解的监督学习领域(通过损失函数),但人们对机器学习系统如何随时间演化仍然了解有限。

为此,论文作者提出了 [*Reward Reports for Reinforcement Learning*](https://www.notion.so/Brief-introduction-to-RL-documentation-b8cbda5a6f5242338e0756e6bef72af4)(这个简洁的命名是为了呼应著名的 *Model Cards for Model Reporting* 和 *Datasheets for Datasets* 两篇论文)。其目标是提出一种聚焦于**奖励中的人为因素**与**随时间变化的反馈系统**的文档形式。

在 Mitchell 等人和 Gebru 等人提出的[模型卡](https://arxiv.org/abs/1810.03993)与[数据表](https://arxiv.org/abs/1803.09010)文档框架的基础上,我们认为 AI 系统需要奖励报告。

**奖励报告(Reward Reports)**是一种动态更新的"活文档",用于记录拟部署的强化学习系统,并界定其设计选择。

然而,关于这一框架对不同强化学习应用的适用性、系统可解释性的障碍,以及已部署的监督式机器学习系统与强化学习中所使用的序贯决策之间的关联,仍存在许多问题。

至少,奖励报告为强化学习从业者提供了一个契机,去深入思考这些问题,并开始着手决定如何在实践中解决它们。

## 用文档记录时序行为

专为强化学习和反馈驱动的机器学习系统设计的文档,其核心组成部分是变更日志(change-log)。变更日志既更新来自设计者的信息(训练参数、数据等的变更),也记录来自用户的观察反馈(有害行为、意外响应等)。

变更日志还配有更新触发机制,以督促对这些影响进行持续监控。

## 参与贡献

一些影响力最大的强化学习驱动系统,本质上涉及多方利益相关者,而且藏在私营企业的深宅大院之内。这些企业在很大程度上不受监管,因此文档化的责任落在了公众身上。

如果你有兴趣参与贡献,我们正在 [GitHub](https://github.com/RewardReports/reward-reports) 上的公开记录中,为流行的机器学习系统构建奖励报告。

想进一步阅读,可以访问奖励报告的[论文](https://arxiv.org/abs/2204.10817),或查看[一份示例报告](https://github.com/RewardReports/reward-reports/tree/main/examples)。

## 作者

本节内容由 <a href="https://twitter.com/natolambert"> Nathan Lambert </a> 撰写
