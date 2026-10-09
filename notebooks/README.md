# 配套代码 · 中文注释版 📓

本目录是 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)官方 notebooks 的**中文注释版**,与 [官方原版](https://github.com/huggingface/deep-rl-class/tree/main/notebooks)逐字对应:

- **Markdown 说明单元格**:全部翻译为简体中文;
- **代码单元格**:代码与官方原版完全一致(已通过 token 级逐字校验),仅将 `#` 注释和 docstring 翻译为中文;
- 运行结果(outputs)、元数据与单元格结构保持原样。

## 使用方式

- **在线运行(推荐新手)**:使用官方 Colab 版,零配置直接跑,入口见各单元的「动手实践」页面([课程中文目录](https://bald0wang.github.io/deep-rl-class-zh/));
- **本地运行**:安装对应单元的依赖(如 `pip install -r notebooks/unit2/requirements-unit2.txt`)后在 Jupyter 中打开;Unit 5 需要额外安装 [Unity ML-Agents](https://github.com/Unity-Technologies/ml-agents) 环境。

## 笔记本一览

| 文件 | 对应单元 | 内容 | 中文译文 |
|------|----------|------|----------|
| `unit1/unit1.ipynb` | Unit 1 | 用 Stable-Baselines3 训练月球着陆器(LunarLander),并上传到 Hugging Face Hub | [Unit 1 · 动手实践](https://bald0wang.github.io/deep-rl-class-zh/units/unit1/10-hands-on/) |
| `unit2/unit2.ipynb` | Unit 2 | 从零实现 Q-Learning,通关 FrozenLake(冰湖)与 Taxi(出租车),含评估与 Hub 上传全流程 | [Unit 2 · 动手实践](https://bald0wang.github.io/deep-rl-class-zh/units/unit2/12-hands-on/) |
| `unit3/unit3.ipynb` | Unit 3 | 用 RL Baselines3 Zoo 在 Atari 游戏「太空侵略者」上训练 DQN | [Unit 3 · 动手实践](https://bald0wang.github.io/deep-rl-class-zh/units/unit3/06-hands-on/) |
| `unit4/unit4.ipynb` | Unit 4 | 用 PyTorch 从零实现 REINFORCE 算法,对比 Cart Pole 与 PixelCopter | [Unit 4 · 动手实践](https://bald0wang.github.io/deep-rl-class-zh/units/unit4/07-hands-on/) |
| `unit5/unit5.ipynb` | Unit 5 | Unity ML-Agents 训练雪球靶(SnowballTarget)智能体 | [Unit 5 · 动手实践](https://bald0wang.github.io/deep-rl-class-zh/units/unit5/06-hands-on/) |
| `unit6/unit6.ipynb` | Unit 6 | Panda-Gym 机器人仿真中训练 A2C 机械臂 | [Unit 6 · 动手实践](https://bald0wang.github.io/deep-rl-class-zh/units/unit6/04-hands-on/) |
| `unit8/unit8_part1.ipynb` | Unit 8 · Part 1 | CleanRL 的 PPO 完整 PyTorch 实现(含 Hugging Face Hub 集成) | [Unit 8 · 实战](https://bald0wang.github.io/deep-rl-class-zh/units/unit8/05-hands-on-cleanrl/) |
| `unit8/unit8_part2.ipynb` | Unit 8 · Part 2 | Sample Factory + ViZDoom(死斗模式)训练 PPO | [Unit 8 · 实战](https://bald0wang.github.io/deep-rl-class-zh/units/unit8/09-hands-on-sf/) |
| `bonus-unit1/bonus-unit1.ipynb`<br>`bonus-unit1/bonus_unit1.ipynb` | Bonus 1 | 训练机器狗 Huggy 叼木棍(官方保留的两个版本) | [Bonus 1](https://bald0wang.github.io/deep-rl-class-zh/units/unitbonus1/03-train/) |

> 说明:Unit 7(AI vs AI 足球)通过 ML-Agents 命令行训练,无 notebook;Bonus 2/3/5 的练习以官方仓库对应说明为准。`requirements-unit*.txt` 为官方依赖清单,未做改动。

## 致谢与许可

代码原作者是 Hugging Face 课程团队,以 [Apache-2.0](../LICENSE.md) 许可发布;中文注释版与原版同许可。
