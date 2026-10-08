> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unit8/hands-on-sf.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unit8/hands-on-sf.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 实战:高级深度强化学习——用 Sample Factory 从像素玩转 Doom

<CourseFloatingBanner classNames="absolute z-10 right-0 top-0"
notebooks={[
  {label: "Google Colab", value: "https://colab.research.google.com/github/huggingface/deep-rl-class/blob/main/notebooks/unit8/unit8_part2.ipynb"}
  ]}
  askForHelpUrl="http://hf.co/join/discord" />

Colab 笔记本:
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/master/notebooks/unit8/unit8_part2.ipynb)

# 第 8 单元 第 2 部分:高级深度强化学习——用 Sample Factory 从像素玩转 Doom

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/thumbnail2.png" alt="缩略图"/>

在本笔记本中,我们将学习如何训练一个深度神经网络,在基于 Doom 游戏的 3D 环境中收集物体,训练出的策略效果见下方视频。我们使用 [Sample Factory](https://www.samplefactory.dev/)——PPO 算法的一种异步实现——来训练这个策略。

请注意以下几点:

*   [Sample Factory](https://www.samplefactory.dev/) 是一个高级强化学习框架,**只能在 Linux 和 Mac 上运行**(不支持 Windows)。

*  该框架在**配备大量 CPU 核心的 GPU 机器**上表现最佳,速度可达每秒 10 万(100k)次交互。标准 Colab 笔记本所能提供的资源**会限制这个库的性能**,因此在这种环境下的速度**并不能反映真实世界的性能**。
* Sample Factory 在多种设置下都有基准测试,想了解更多请查看这些[示例](https://github.com/alex-petrenko/sample-factory/tree/master/sf_examples)。


```python
from IPython.display import HTML

HTML(
    """<video width="640" height="480" controls>
  <source src="https://huggingface.co/edbeeching/doom_health_gathering_supreme_3333/resolve/main/replay.mp4"
  type="video/mp4">Your browser does not support the video tag.</video>"""
)
```

要通过[认证流程](https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process)对本实战进行验证,你需要推送一个模型:

- `doom_health_gathering_supreme` 取得大于等于 5 的成绩。

要查看你的成绩,请前往[排行榜](https://huggingface.co/spaces/huggingface-projects/Deep-Reinforcement-Learning-Leaderboard)找到你的模型,**成绩 = mean_reward - 奖励的标准差(std of reward)**

如果找不到你的模型,**请滚动到页面底部,点击刷新按钮**

有关认证流程的更多信息,请查看这一节 👉 https://huggingface.co/deep-rl-course/en/unit0/introduction#certification-process

## 设置 GPU 💪

- 为了**加速智能体的训练,我们将使用 GPU**。为此,请前往 `Runtime > Change Runtime type`(运行时 > 更改运行时类型)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step1.jpg" alt="GPU 步骤 1">

- `Hardware Accelerator > GPU`(硬件加速器 > GPU)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step2.jpg" alt="GPU 步骤 2">

在开始训练智能体之前,我们先来**了解一下将要使用的库和环境**。

## Sample Factory

[Sample Factory](https://www.samplefactory.dev/) 是**最快的强化学习库之一,专注于策略梯度(PPO)的高效同步与异步实现**。

Sample Factory 经过**充分测试,被众多研究人员和从业者使用**,并且得到积极维护。这一实现以**在多种领域中达到 SOTA(最先进)性能、同时将强化学习实验的训练时间和硬件需求降到最低**而著称。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/samplefactoryenvs.png" alt="Sample Factory"/>

### 主要特性

- 高度优化的算法[架构](https://www.samplefactory.dev/06-architecture/overview/),实现最大的学习吞吐量
- [同步与异步](https://www.samplefactory.dev/07-advanced-topics/sync-async/)训练模式
- 便于调试的[串行(单进程)模式](https://www.samplefactory.dev/07-advanced-topics/serial-mode/)
- 在基于 CPU 和 [GPU 加速的环境](https://www.samplefactory.dev/09-environment-integrations/isaacgym/)中都有最佳性能
- 支持单智能体与多智能体训练、自我对弈(self-play),可在单个或多个 GPU 上同时[训练多个策略](https://www.samplefactory.dev/07-advanced-topics/multi-policy-training/)
- 基于种群的训练(Population-Based Training,[PBT](https://www.samplefactory.dev/07-advanced-topics/pbt/))
- 离散、连续、混合动作空间
- 基于向量、基于图像、基于字典的观测空间
- 通过解析动作/观测空间规格自动创建模型架构,支持[自定义模型架构](https://www.samplefactory.dev/03-customization/custom-models/)
- 专为导入其他项目而设计,[自定义环境](https://www.samplefactory.dev/03-customization/custom-environments/)是一等公民
- 详细的 [WandB 与 Tensorboard 摘要](https://www.samplefactory.dev/05-monitoring/metrics-reference/)、[自定义指标](https://www.samplefactory.dev/05-monitoring/custom-metrics/)
- [Hugging Face 🤗 集成](https://www.samplefactory.dev/10-huggingface/huggingface/)(把训练好的模型和指标上传到 Hub)
- 多个附带调优参数和训练好模型的[示例](https://www.samplefactory.dev/09-environment-integrations/mujoco/)[环境](https://www.samplefactory.dev/09-environment-integrations/atari/)[集成](https://www.samplefactory.dev/09-environment-integrations/vizdoom/)[方案](https://www.samplefactory.dev/09-environment-integrations/dmlab/)

以上所有策略(模型)都可以在 🤗 Hub 上找到。搜索标签 [sample-factory](https://huggingface.co/models?library=sample-factory&sort=downloads) 即可。

### Sample Factory 的工作原理

Sample Factory 是**社区可用的优化程度最高的强化学习实现之一**。

它通过**启动多个进程来运行 rollout worker(采样工作进程)、inference worker(推理工作进程)和一个 learner worker(学习工作进程)**。

各个 *worker* 之间**通过共享内存通信,从而降低了进程间的通信开销**。

*rollout worker* 与环境交互,并把观测发送给 *inference worker*。

*inference worker* 查询策略的固定版本,并**把动作回传给 rollout worker**。

经过 *k* 步之后,rollout worker 把一条经验轨迹发送给 learner worker,**后者用它来更新智能体的策略网络**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/samplefactory.png" alt="Sample Factory"/>

### Sample Factory 中的 Actor Critic(演员-评论家)模型

Sample Factory 中的 Actor Critic 模型由三个组件构成:

- **Encoder(编码器)** —— 处理输入观测(图像、向量)并把它们映射为向量。这是模型中最可能需要你自定义的部分。
- **Core(核心)** —— 整合来自一个或多个编码器的向量,在基于记忆的智能体中还可以选择性地包含单层或多层 LSTM/GRU。
- **Decoder(解码器)** —— 在计算策略输出和值输出之前,对模型核心的输出施加额外的层。

这个库在设计上可以自动支持任意观测空间和动作空间。用户可以轻松添加自定义模型。更多信息请参阅[文档](https://www.samplefactory.dev/03-customization/custom-models/#actor-critic-models-in-sample-factory)。

## ViZDoom

[ViZDoom](https://vizdoom.cs.put.edu.pl/) 是一个**面向 Doom 引擎的开源 Python 接口**。

该库由波兰波兹南理工大学(Poznan University of Technology)计算科学研究所的 Marek Wydmuch 和 Michal Kempka 于 2016 年创建。

该库支持**在多种场景中直接从屏幕像素训练智能体**,包括下方视频展示的团队死斗模式(team deathmatch)。由于 ViZDoom 环境基于一款诞生于 90 年代的游戏,它可以在现代硬件上加速运行,**让我们能够相当快速地学到复杂的 AI 行为**。

该库包含如下特性:

- 跨平台(Linux、macOS、Windows),
- 提供 Python 和 C++ 的 API,
- [OpenAI Gym](https://www.gymlibrary.dev/) 环境包装器
- 易于创建自定义场景(提供可视化编辑器、脚本语言和示例),
- 异步和同步的单人与多人模式,
- 轻量(仅几 MB)且快速(同步模式下单线程最高可达 7000 fps),
- 分辨率和渲染参数可自定义,
- 可访问深度缓冲区(3D 视觉),
- 自动标注帧中可见的游戏物体,
- 可访问音频缓冲区
- 可访问角色/物体列表和地图几何信息,
- 支持离屏渲染与回合录制,
- 异步模式下的时间缩放。

## 我们首先需要安装 ViZDoom 环境所需的一些依赖

Colab 运行时设置好之后,我们可以先安装 Linux 上运行 ViZDoom 所需的依赖。

如果你是在自己的 Mac 机器上跟随操作,请参考 [GitHub 页面](https://github.com/Farama-Foundation/ViZDoom/blob/master/doc/Quickstart.md#-quickstart-for-macos-and-anaconda3-python-36)上的安装说明。

```python
# 安装 ViZDoom 依赖,参考自
# https://github.com/mwydmuch/ViZDoom/blob/master/doc/Building.md#-linux

apt-get install build-essential zlib1g-dev libsdl2-dev libjpeg-dev \
nasm tar libbz2-dev libgtk2.0-dev cmake git libfluidsynth-dev libgme-dev \
libopenal-dev timidity libwildmidi-dev unzip ffmpeg

# Boost 库
apt-get install libboost-all-dev

# Lua 绑定依赖
apt-get install liblua5.1-dev
```

## 接下来就可以安装 Sample Factory 和 ViZDoom 了

- 这一步可能需要 7 分钟

```bash
pip install sample-factory
pip install vizdoom
```

## 在 Sample Factory 中设置 Doom 环境

```python
import functools

from sample_factory.algo.utils.context import global_model_factory
from sample_factory.cfg.arguments import parse_full_cfg, parse_sf_args
from sample_factory.envs.env_utils import register_env
from sample_factory.train import run_rl

from sf_examples.vizdoom.doom.doom_model import make_vizdoom_encoder
from sf_examples.vizdoom.doom.doom_params import add_doom_env_args, doom_override_defaults
from sf_examples.vizdoom.doom.doom_utils import DOOM_ENVS, make_doom_env_from_spec


# 注册所有 ViZDoom 环境
def register_vizdoom_envs():
    for env_spec in DOOM_ENVS:
        make_env_func = functools.partial(make_doom_env_from_spec, env_spec)
        register_env(env_spec.name, make_env_func)


# Sample Factory 允许注册自定义神经网络架构
# 详情参见 https://github.com/alex-petrenko/sample-factory/blob/master/sf_examples/vizdoom/doom/doom_model.py
def register_vizdoom_models():
    global_model_factory().register_encoder_factory(make_vizdoom_encoder)


def register_vizdoom_components():
    register_vizdoom_envs()
    register_vizdoom_models()


# 解析命令行参数并创建配置
def parse_vizdoom_cfg(argv=None, evaluation=False):
    parser, _ = parse_sf_args(argv=argv, evaluation=evaluation)
    # Doom 环境特有的参数
    add_doom_env_args(parser)
    # 覆盖算法参数的 Doom 默认值
    doom_override_defaults(parser)
    # 第二轮解析得到最终配置
    final_cfg = parse_full_cfg(parser, argv)
    return final_cfg
```

设置完成后,我们就可以训练智能体了。这里我们选择学习一个名为 `Health Gathering Supreme` 的 ViZDoom 任务。

### 场景:Health Gathering Supreme

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit9/Health-Gathering-Supreme.png" alt="Health Gathering Supreme"/>



这个场景的目标是**教会智能体如何在不知道什么因素让自己存活的情况下生存下来**。智能体只知道**生命是宝贵的**,而死亡是糟糕的,因此**它必须自己学会什么东西能延长自己的存活时间,以及自己的生命值与生存息息相关**。

地图是一个矩形,内有墙壁,地面是绿色的酸性地板,会**周期性地对玩家造成伤害**。最初有一些医疗包均匀分布在地图上,此后会不时地有新的医疗包从天而降。**医疗包可以恢复玩家的一部分生命值**——要想活下来,智能体需要把它们捡起来。回合在玩家死亡或超时后结束。

其他配置:
- Living_reward = 1
- 3 个可用按钮:左转、右转、前进
- 1 个可用的游戏变量:HEALTH
- 死亡惩罚(death penalty)= 100

你可以在[这里](https://github.com/Farama-Foundation/ViZDoom/tree/master/scenarios)进一步了解 ViZDoom 中可用的场景。

还有一些为 ViZDoom 创建的更复杂的场景,比如 [这个 GitHub 页面](https://github.com/edbeeching/3d_control_deep_rl)上详细介绍的那些。



## 训练智能体

- 我们将训练智能体 4000000 步,大约需要 20 分钟

```python
## 开始训练,这一步大约需要 15 分钟
register_vizdoom_components()

# 我们今天训练的场景是 health gathering
# 其他场景包括 "doom_basic"、"doom_two_colors_easy"、"doom_dm"、"doom_dwango5"、"doom_my_way_home"、"doom_deadly_corridor"、"doom_defend_the_center"、"doom_defend_the_line"
env = "doom_health_gathering_supreme"
cfg = parse_vizdoom_cfg(
    argv=[f"--env={env}", "--num_workers=8", "--num_envs_per_worker=4", "--train_for_env_steps=4000000"]
)

status = run_rl(cfg)
```

## 一起来看看训练出的策略的表现,并输出智能体的视频。

```python
from sample_factory.enjoy import enjoy

cfg = parse_vizdoom_cfg(
    argv=[f"--env={env}", "--num_workers=1", "--save_video", "--no_render", "--max_num_episodes=10"], evaluation=True
)
status = enjoy(cfg)
```

## 下面来可视化智能体的表现

```python
from base64 import b64encode
from IPython.display import HTML

mp4 = open("/content/train_dir/default_experiment/replay.mp4", "rb").read()
data_url = "data:video/mp4;base64," + b64encode(mp4).decode()
HTML(
    """
<video width=640 controls>
      <source src="%s" type="video/mp4">
</video>
"""
    % data_url
)
```

智能体学到了一些东西,但它的表现还可以更好。显然我们需要训练更长时间。不过,先把模型上传到 Hub 吧。

## 现在把你的检查点(checkpoint)和视频上传到 Hugging Face Hub




要想与社区分享你的模型,还需要完成以下三个步骤:

1️⃣(如果还没有的话)在 HF 上创建账号 ➡ https://huggingface.co/join

2️⃣ 登录并从 Hugging Face 网站获取你的身份验证令牌(token)。
- 创建一个**具有写权限(write role)**的新令牌(https://huggingface.co/settings/tokens)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/create-token.jpg" alt="创建 HF 令牌">

- 复制令牌
- 运行下面的单元格并粘贴令牌

如果你不想使用 Google Colab 或 Jupyter Notebook,则需要改用这个命令:`huggingface-cli login`

```python
from huggingface_hub import notebook_login
notebook_login()
!git config --global credential.helper store
```

```python
from sample_factory.enjoy import enjoy

hf_username = "ThomasSimonini"  # 在这里填入你的 Hugging Face 用户名

cfg = parse_vizdoom_cfg(
    argv=[
        f"--env={env}",
        "--num_workers=1",
        "--save_video",
        "--no_render",
        "--max_num_episodes=10",
        "--max_num_frames=100000",
        "--push_to_hub",
        f"--hf_repository={hf_username}/rl_course_vizdoom_health_gathering_supreme",
    ],
    evaluation=True,
)
status = enjoy(cfg)
```

## 我们来加载另一个模型




这个智能体的表现不错,但我们还可以做得更好!让我们从 Hub 下载并可视化一个训练了 100 亿(10B)时间步的智能体。

```bash
# 从 Hub 下载该智能体
python -m sample_factory.huggingface.load_from_hub -r edbeeching/doom_health_gathering_supreme_2222 -d ./train_dir
```

```bash
ls train_dir/doom_health_gathering_supreme_2222
```

```python
env = "doom_health_gathering_supreme"
cfg = parse_vizdoom_cfg(
    argv=[
        f"--env={env}",
        "--num_workers=1",
        "--save_video",
        "--no_render",
        "--max_num_episodes=10",
        "--experiment=doom_health_gathering_supreme_2222",
        "--train_dir=train_dir",
    ],
    evaluation=True,
)
status = enjoy(cfg)
```

```python
mp4 = open("/content/train_dir/doom_health_gathering_supreme_2222/replay.mp4", "rb").read()
data_url = "data:video/mp4;base64," + b64encode(mp4).decode()
HTML(
    """
<video width=640 controls>
      <source src="%s" type="video/mp4">
</video>
"""
    % data_url
)
```

## 一些额外的挑战 🏆:Doom 死斗模式

训练智能体去玩 Doom 死斗模式**需要在比 Colab 强劲得多的机器上花费许多个小时**。

幸运的是,我们**已经在这个场景中训练好了一个智能体,而且它就在 🤗 Hub 上!**让我们下载这个模型,看看它的表现。

```python
# 从 Hub 下载该智能体
python -m sample_factory.huggingface.load_from_hub -r edbeeching/doom_deathmatch_bots_2222 -d ./train_dir
```

由于智能体会玩上很长时间,视频生成可能需要 **10 分钟**。

```python
from sample_factory.enjoy import enjoy

register_vizdoom_components()
env = "doom_deathmatch_bots"
cfg = parse_vizdoom_cfg(
    argv=[
        f"--env={env}",
        "--num_workers=1",
        "--save_video",
        "--no_render",
        "--max_num_episodes=1",
        "--experiment=doom_deathmatch_bots_2222",
        "--train_dir=train_dir",
    ],
    evaluation=True,
)
status = enjoy(cfg)
mp4 = open("/content/train_dir/doom_deathmatch_bots_2222/replay.mp4", "rb").read()
data_url = "data:video/mp4;base64," + b64encode(mp4).decode()
HTML(
    """
<video width=640 controls>
      <source src="%s" type="video/mp4">
</video>
"""
    % data_url
)
```


你**可以尝试用上面的代码在这个环境中训练你自己的智能体**,但不能在 Colab 上进行。
**祝你好运 🤞**

如果你想要简单一些的场景,**为什么不试试在另一个 ViZDoom 场景中训练,比如 `doom_deadly_corridor` 或 `doom_defend_the_center`。**



---


最后一个单元到此就结束了,但我们还没有完成!🤗 接下来的**附加章节涵盖了深度强化学习中最有趣、最先进、最前沿的一些工作**。

## 持续学习,保持出色 🤗
