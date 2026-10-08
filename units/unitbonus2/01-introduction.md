> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus2/introduction.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus2/introduction.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 简介

深度强化学习中最关键的任务之一,就是**找到一组合适的训练超参数(hyperparameter)**。

<img src="https://raw.githubusercontent.com/optuna/optuna/master/docs/image/optuna-logo.png" alt="Optuna Logo"/>

[Optuna](https://optuna.org/) 是一个能帮你把搜索过程自动化的库。在本单元中,我们将学习**自动超参数调优(hyperparameter tuning)背后的一点理论**。我们先尝试手动优化上一单元中所学的 DQN 的参数,然后再**学习如何用 Optuna 将搜索自动化**。
