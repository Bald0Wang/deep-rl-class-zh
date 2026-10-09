> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit6/hands-on.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit6/hands-on.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 使用 Panda-Gym 机器人仿真训练优势 Actor-Critic(A2C) 🤖


      > 📓 本单元配套笔记本:[Google Colab](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/main/notebooks/unit6/unit6.ipynb) · [Discord 求助](http://hf.co/join/discord)


现在你已经学习了优势 Actor-Critic(A2C)背后的理论,**可以开始在机器人环境中使用 Stable-Baselines3 训练你的 A2C 智能体了**。我们要训练的是:
- 一只机械臂 🦾,让它移动到正确的位置。

我们将要使用:
- [panda-gym](https://github.com/qgallouedec/panda-gym)

要在认证流程中通过这个实战练习,你需要把训练好的两个模型推送到 Hub,并取得以下成绩:

- `PandaReachDense-v3` 的成绩需 >= -3.5。

要查看你的成绩,[请前往排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)找到你的模型,**成绩 = mean_reward - std of reward**

想了解认证流程的更多信息,请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

**点击下方 Open In Colab 按钮开始实战** 👇 :

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/master/notebooks/unit6/unit6.ipynb)


# 第 6 单元:使用 Panda-Gym 机器人仿真训练优势 Actor-Critic(A2C) 🤖

### 🎮 环境:

- [Panda-Gym](https://github.com/qgallouedec/panda-gym)

### 📚 强化学习库:

- [Stable-Baselines3](https://stable-baselines3.readthedocs.io/)

我们一直在努力改进教程,所以**如果你在这个 notebook 中发现了问题**,请[在 GitHub 仓库中提交 issue](https://github.com/huggingface/deep-rl-class/issues)。

## 本 notebook 的目标 🏆

完成本 notebook 后,你将能够:

- 使用环境库 **Panda-Gym**。
- **使用 A2C 训练机器人**。
- 理解为什么**我们需要对输入进行归一化**。
- **把训练好的智能体和代码推送到 Hub**,并附带精彩的回放视频和评估分数 🔥。

## 前置要求 🏗️

在开始本 notebook 之前,你需要:

🔲 📚 [阅读第 6 单元,学习 Actor-Critic 方法](https://huggingface.co/deep-rl-course/unit6/introduction) 🤗

# 来训练我们的第一批机器人吧 🤖

## 设置 GPU 💪

- 为了**加速智能体的训练,我们将使用 GPU**。为此,请进入 `Runtime > Change Runtime type`

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step1.jpg" alt="GPU 步骤 1">

- `Hardware Accelerator > GPU`

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step2.jpg" alt="GPU 步骤 2">

## 创建虚拟显示器 🔽

在本 notebook 中,我们需要生成回放视频。为此,在 Colab 上**我们需要一个虚拟屏幕才能渲染环境**(从而录制画面帧)。

下面这个单元格会安装所需的库,并创建和启动一个虚拟屏幕 🖥

```python
%%capture
!apt install python-opengl
!apt install ffmpeg
!apt install xvfb
!pip3 install pyvirtualdisplay
```

```python
# 虚拟显示器
from pyvirtualdisplay import Display

virtual_display = Display(visible=0, size=(1400, 900))
virtual_display.start()
```

### 安装依赖 🔽

我们要安装多个依赖:

- `gymnasium`
- `panda-gym`:包含机械臂环境。
- `stable-baselines3`:SB3 深度强化学习库。
- `huggingface_sb3`:为 Stable-Baselines3 提供的额外代码,用于从 Hugging Face 🤗 Hub 加载和上传模型。
- `huggingface_hub`:让任何人都能操作 Hub 仓库的库。

```bash
!pip install stable-baselines3[extra]
!pip install gymnasium
!pip install huggingface_sb3
!pip install huggingface_hub
!pip install panda_gym
```

## 导入所需的包 📦

```python
import os

import gymnasium as gym
import panda_gym

from huggingface_sb3 import load_from_hub, package_to_hub

from stable_baselines3 import A2C
from stable_baselines3.common.evaluation import evaluate_policy
from stable_baselines3.common.vec_env import DummyVecEnv, VecNormalize
from stable_baselines3.common.env_util import make_vec_env

from huggingface_hub import notebook_login
```

## PandaReachDense-v3 🦾

我们要训练的智能体是一只机械臂,它需要完成控制任务(移动机械臂并使用末端执行器)。

在机器人学中,*末端执行器(end-effector)*是位于机械臂末端、用于与环境交互的装置。

在 `PandaReach` 中,机器人必须把它的末端执行器放置到目标位置(绿色小球)。

我们将使用这个环境的稠密(dense)版本。这意味着我们会得到一个*稠密奖励函数*,它**会在每个时间步(timestep)都给出奖励**(智能体越接近完成任务,奖励越高)。与之相对的是*稀疏奖励函数(sparse reward function)*,在这种函数下,环境**当且仅当任务完成时才返回奖励**。

此外,我们将使用*末端执行器位移控制(End-effector displacement control)*,也就是说,**动作对应的是末端执行器的位移**。我们不控制每个关节的单独运动(即关节控制)。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit8/robotics.jpg"  alt="机器人"/>

这样**训练会更容易**。

### 创建环境

#### 环境 🎮

在 `PandaReachDense-v3` 中,机械臂必须把末端执行器放置到目标位置(绿色小球)。

```python
env_id = "PandaReachDense-v3"

# 创建环境
env = gym.make(env_id)

# 获取状态空间和动作空间
s_size = env.observation_space.shape
a_size = env.action_space
```

```python
print("_____OBSERVATION SPACE_____ \n")
print("The State Space is: ", s_size)
print("Sample observation", env.observation_space.sample()) # 随机获取一个观测
```

观测空间**是一个包含 3 个不同元素的字典**:

- `achieved_goal`:目标的 (x,y,z) 位置。
- `desired_goal`:目标位置与当前物体位置之间的 (x,y,z) 距离。
- `observation`:末端执行器的位置 (x,y,z) 和速度 (vx, vy, vz)。

由于观测是一个字典,**我们需要使用 MultiInputPolicy 策略,而不是 MlpPolicy**。

```python
print("\n _____ACTION SPACE_____ \n")
print("The Action Space is: ", a_size)
print("Action Space Sample", env.action_space.sample()) # 随机执行一个动作
```

动作空间是一个包含 3 个值的向量:
- 控制 x、y、z 方向的移动


### 归一化观测与奖励

在强化学习中,一个良好的实践是[对输入特征进行归一化](https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html)。

为此,有一个封装器(wrapper)可以计算输入特征的滚动平均值和标准差。

我们也可以用同一个封装器来归一化奖励,只需加上 `norm_reward = True`

[请查阅文档来完成这个单元格](https://stable-baselines3.readthedocs.io/en/master/guide/vec_envs.html#vecnormalize)

```python
env = make_vec_env(env_id, n_envs=4)

# 添加这个封装器来归一化观测和奖励
env = # TODO: 添加封装器
```

#### 参考答案

```python
env = make_vec_env(env_id, n_envs=4)

env = VecNormalize(env, norm_obs=True, norm_reward=True, clip_obs=10.)
```

### 创建 A2C 模型 🤖

想了解更多关于 Stable-Baselines3 中 A2C 实现的信息,请查看:https://stable-baselines3.readthedocs.io/en/master/modules/a2c.html#notes

为了找到最佳参数,我参考了 [Stable-Baselines3 团队官方训练好的智能体](https://huggingface.co/sb3)。

```python
model = # 创建 A2C 模型,并尝试寻找最佳参数
```

#### 参考答案

```python
model = A2C(policy = "MultiInputPolicy",
            env = env,
            verbose=1)
```

### 训练 A2C 智能体 🏃

- 让我们把智能体训练 1,000,000 个时间步。别忘了在 Colab 上使用 GPU。这一步大约需要 25~40 分钟

```python
model.learn(1_000_000)
```

```python
# 保存模型,并在保存智能体时同时保存 VecNormalize 统计量
model.save("a2c-PandaReachDense-v3")
env.save("vec_normalize.pkl")
```

### 评估智能体 📈

- 现在智能体已经训练完成,我们需要**检验它的性能**。
- Stable-Baselines3 提供了一个专门的方法:`evaluate_policy`

```python
from stable_baselines3.common.vec_env import DummyVecEnv, VecNormalize

# 加载已保存的统计量
eval_env = DummyVecEnv([lambda: gym.make("PandaReachDense-v3")])
eval_env = VecNormalize.load("vec_normalize.pkl", eval_env)

# 我们需要覆盖 render_mode
eval_env.render_mode = "rgb_array"

# 在测试时不更新它们
eval_env.training = False
# 测试时不需要对奖励做归一化
eval_env.norm_reward = False

# 加载智能体
model = A2C.load("a2c-PandaReachDense-v3")

mean_reward, std_reward = evaluate_policy(model, eval_env)

print(f"Mean reward = {mean_reward:.2f} +/- {std_reward:.2f}")
```
### 把训练好的模型发布到 Hub 🔥

训练之后我们已经看到结果不错,现在可以用一行代码把训练好的模型发布到 Hub。

📚 相关库的文档 👉 https://github.com/huggingface/huggingface_sb3/tree/main#hugging-face--x-stable-baselines3-v20

使用 `package_to_hub`,正如前几个单元中已经提到过的,**你可以评估智能体、录制回放、为你的智能体生成模型卡片(model card),并将它推送到 Hub**。

这样一来:
- 你可以**展示自己的成果** 🔥
- 你可以**直观地看到你的智能体的操作** 👀
- 你可以**与社区分享一个别人也能使用的智能体** 💾
- 你可以**访问排行榜 🏆,看看你的智能体与其他学员相比表现如何** 👉 https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard

要与社区分享你的模型,还需要完成以下三个步骤:

1️⃣ (如果还没有的话)注册一个 HF 账号 ➡ https://huggingface.co/join

2️⃣ 登录之后,你需要保存来自 Hugging Face 网站的认证令牌(token)。
- 创建一个新令牌(https://huggingface.co/settings/tokens),**角色要选 write(写入)**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/create-token.jpg" alt="创建 HF 令牌">

- 复制令牌
- 运行下面的单元格并粘贴令牌

```python
notebook_login()
!git config --global credential.helper store
```
如果你不想使用 Google Colab 或 Jupyter Notebook,则需要改用这条命令:`huggingface-cli login`

3️⃣ 现在我们可以使用 `package_to_hub()` 函数,把训练好的智能体推送到 🤗 Hub 了 🔥。
对于这个环境,**运行这个单元格大约需要 10 分钟**

```python
from huggingface_sb3 import package_to_hub

package_to_hub(
    model=model,
    model_name=f"a2c-{env_id}",
    model_architecture="A2C",
    env_id=env_id,
    eval_env=eval_env,
    repo_id=f"ThomasSimonini/a2c-{env_id}", # 修改成你的用户名
    commit_message="Initial commit",
)
```

## 一些额外的挑战 🏆

最好的学习方式**就是亲自动手尝试**!为什么不试试 `PandaPickAndPlace-v3` 呢?

如果你想尝试 panda-gym 中更高级的任务,可以看看用 **TQC 或 SAC**(一种样本效率更高、适合机器人任务的算法)完成的工作。在真实的机器人上,你会使用样本效率更高的算法,原因很简单:与仿真不同,**如果你让机械臂移动得太多,就有损坏它的风险**。

PandaPickAndPlace-v1(该模型使用的是环境的 v1 版本):https://huggingface.co/sb3/tqc-PandaPickAndPlace-v1

也欢迎查阅 panda-gym 的文档:https://panda-gym.readthedocs.io/en/latest/usage/train_with_sb3.html

我们为你提供了训练另一个智能体的步骤(可选):

1. 定义名为 "PandaPickAndPlace-v3" 的环境
2. 创建向量化环境
3. 添加封装器来归一化观测和奖励。[查阅文档](https://stable-baselines3.readthedocs.io/en/master/guide/vec_envs.html#vecnormalize)
4. 创建 A2C 模型(别忘了设置 verbose=1 来打印训练日志)。
5. 训练 100 万(1M)个时间步
6. 保存模型,并在保存智能体时同时保存 VecNormalize 统计量
7. 评估你的智能体
8. 使用 `package_to_hub` 把训练好的模型发布到 Hub 🔥


### 参考答案(可选)

```python
# 1 - 2
env_id = "PandaPickAndPlace-v3"
env = make_vec_env(env_id, n_envs=4)

# 3
env = VecNormalize(env, norm_obs=True, norm_reward=True, clip_obs=10.)

# 4
model = A2C(policy = "MultiInputPolicy",
            env = env,
            verbose=1)
# 5
model.learn(1_000_000)
```

```python
# 6
model_name = "a2c-PandaPickAndPlace-v3";
model.save(model_name)
env.save("vec_normalize.pkl")

# 7
from stable_baselines3.common.vec_env import DummyVecEnv, VecNormalize

# 加载已保存的统计量
eval_env = DummyVecEnv([lambda: gym.make("PandaPickAndPlace-v3")])
eval_env = VecNormalize.load("vec_normalize.pkl", eval_env)

# 在测试时不更新它们
eval_env.training = False
# 测试时不需要对奖励做归一化
eval_env.norm_reward = False

# 加载智能体
model = A2C.load(model_name)

mean_reward, std_reward = evaluate_policy(model, eval_env)

print(f"Mean reward = {mean_reward:.2f} +/- {std_reward:.2f}")

# 8
package_to_hub(
    model=model,
    model_name=f"a2c-{env_id}",
    model_architecture="A2C",
    env_id=env_id,
    eval_env=eval_env,
    repo_id=f"ThomasSimonini/a2c-{env_id}", # TODO: 修改成你的用户名
    commit_message="Initial commit",
)
```

第 7 单元见! 🔥

## 持续学习,保持优秀 🤗
