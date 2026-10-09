---
hide:
  - navigation
  - toc
---

# 深度强化学习课程 · 中文版 🤗

<p align="center">
  <img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/deep-rl-course-illustration.jpg" alt="Deep RL 课程插画" style="max-width: 720px; width: 100%;">
</p>

本站是 [Hugging Face Deep Reinforcement Learning Course](https://huggingface.co/learn/deep-rl-course) 的中文版本课程,基于官方源码仓库 [huggingface/deep-rl-class](https://github.com/huggingface/deep-rl-class)(Apache-2.0)翻译而成,译文由 AI 辅助生成,仅供学习交流。

深度强化学习(Deep RL)是人工智能中最迷人的领域之一:AlphaGo、Atari 游戏、机器人控制、大模型对齐(RLHF)背后都有它的身影。课程特点是**理论 + 实战结合**:每个单元先讲透一个核心算法,再用 Google Colab 笔记本动手训练智能体,并把训练成果上传到 Hugging Face Hub 与全球学习者互相评分。完成全部单元还可获得[结业证书](appendix/02-certification.md)。

<p style="text-align: center; margin: 1.8em 0;">
[ :material-rocket-launch: 开始学习 Unit 0](units/unit0/01-introduction.md){: .md-button .md-button--primary }
[ :material-table-of-contents: 浏览课程目录](#课程单元){: .md-button }
</p>

## 如何使用本课程

1. 先阅读 [Unit 0 · 欢迎来到课程](units/unit0/01-introduction.md) 与 [环境配置](units/unit0/02-setup.md);
2. 按下方卡片顺序学习:每个单元先读理论页,再到「动手实践」页进入 Colab 运行代码;
3. 原版 Colab 笔记本在官方仓库 [notebooks/](https://github.com/huggingface/deep-rl-class/tree/main/notebooks) 目录,可直接运行。

每个单元约需 1 周、每周 3–4 小时;左侧边栏可跳转任意页面,右上角 🌓 切换深浅色。

## 课程单元

<div class="grid cards" markdown>

- :material-numeric-0-box:**[Unit 0 · 欢迎来到课程](units/unit0/01-introduction.md)**

  ---

  课程总览与环境配置(Discord 入门)

- :material-numeric-1-box:**[Unit 1 · 深度强化学习入门](units/unit1/01-introduction.md)**

  ---

  RL 框架、探索与利用、价值方法 vs 策略方法;实战:月球着陆器

- :material-dog-side:**[Bonus 1 · 和机器狗 Huggy 一起入门](units/unitbonus1/01-introduction.md)**

  ---

  用 PPO 训练吉祥物 Huggy 叼木棍

- :material-numeric-2-box:**[Unit 2 · Q-Learning 入门](units/unit2/01-introduction.md)**

  ---

  贝尔曼方程、蒙特卡洛 vs 时序差分;实战:Frozen Lake 与 Taxi

- :material-gamepad-square:**[Unit 3 · Deep Q-Learning 与 Atari](units/unit3/01-introduction.md)**

  ---

  DQN、经验回放、目标网络;实战:太空侵略者

- :material-tune:**[Bonus 2 · Optuna 自动调参](units/unitbonus2/01-introduction.md)**

  ---

  超参数搜索与剪枝

- :material-chart-line:**[Unit 4 · 策略梯度与 PyTorch](units/unit4/01-introduction.md)**

  ---

  策略方法、策略梯度定理;实战:手写 REINFORCE

- :material-snowflake:**[Unit 5 · Unity ML-Agents 入门](units/unit5/01-introduction.md)**

  ---

  ML-Agents 工作原理、好奇心机制;实战:雪球靶与金字塔

- :material-robot:**[Unit 6 · Actor-Critic 与机器人](units/unit6/01-introduction.md)**

  ---

  REINFORCE 的方差问题、A2C;实战:Panda-Gym 机械臂

- :material-soccer:**[Unit 7 · 多智能体与 AI vs AI](units/unit7/01-introduction.md)**

  ---

  MARL、自博弈、Elo 等级分;实战:训练足球队

- :material-rocket-launch:**[Unit 8 · 近端策略优化 PPO](units/unit8/01-introduction.md)**

  ---

  裁剪代理目标函数;实战:CleanRL 与 Sample Factory + Doom

- :material-book-open-variant:**[Bonus 3 · 强化学习进阶专题](units/unitbonus3/01-introduction.md)**

  ---

  基于模型的 RL、离线 RL、RLHF、Decision Transformer、课程学习等

- :material-hand-back-left:**[Bonus 5 · Godot 模仿学习](units/unitbonus5/01-introduction.md)**

  ---

  用 Godot RL Agents 通过示范训练机械臂机器人

</div>

## 译文说明

- 每篇译文开头附有指向官方源文件的原文链接,便于对照;
- 代码、命令行、库名、LaTeX 公式保持原样,代码注释译为中文;
- 交互式测验以可折叠的「选项与解析」呈现;
- 发现翻译问题欢迎到 [GitHub 仓库](https://github.com/Bald0Wang/deep-rl-class-zh/issues)提 Issue。

## 致谢与许可

原课程由 [Thomas Simonini](https://huggingface.co/thomassimonini) 与 Hugging Face 社区出品;原课程与本项目均以 [Apache License 2.0](https://github.com/Bald0Wang/deep-rl-class-zh/blob/main/LICENSE.md) 发布,版权归原作者所有。
