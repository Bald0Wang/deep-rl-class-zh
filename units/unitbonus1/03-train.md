> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus1/train.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus1/train.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 和 Huggy 一起训练、玩耍吧 🐶




          <CourseFloatingBanner classNames="absolute z-10 right-0 top-0"
          notebooks={[
          {label: "Google Colab", value: "https://colab.research.google.com/github/huggingface/deep-rl-class/blob/master/notebooks/bonus-unit1/bonus-unit1.ipynb"}
          ]}
            askForHelpUrl="http://hf.co/join/discord" />



我们**强烈建议学生使用 Google Colab 来完成动手练习**,而不是在自己的个人电脑上运行。

使用 Google Colab,**你可以专注于学习和实验,而无需为搭建环境的各种技术问题操心**。


## 我们来训练 Huggy 吧 🐶

**要开始训练 Huggy,请点击 Open In Colab 按钮** 👇:

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/master/notebooks/bonus-unit1/bonus-unit1.ipynb)

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit2/thumbnail.png" alt="附加单元 1 缩略图">

在这个 notebook 中,我们将通过**教机器狗 Huggy 捡回木棍,然后直接在你的浏览器中和它一起玩**,来巩固第一个单元中学到的内容

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/huggy.jpg" alt="Huggy"/>

### 环境 🎮

- 机器狗 Huggy,一个由 [Thomas Simonini](https://twitter.com/ThomasSimonini) 基于 [Puppo The Corgi](https://blog.unity.com/technology/puppo-the-corgi-cuteness-overload-with-the-unity-ml-agents-toolkit) 创建的环境

### 使用的库 📚

- [MLAgents](https://github.com/Unity-Technologies/ml-agents)

我们一直在努力改进我们的教程,所以**如果你在这个 notebook 中发现了一些问题**,请[在 GitHub 仓库上提交 issue](https://github.com/huggingface/deep-rl-class/issues)。

## 本 notebook 的目标 🏆

完成本 notebook 之后,你将:

- 理解**用于训练 Huggy 的状态空间(State Space)、动作空间(Action Space)和奖励函数(Reward Function)**。
- **训练你自己的 Huggy**去捡木棍。
- 能够**直接在你的浏览器中和你训练出的 Huggy 一起玩**。


## 前置要求 🏗️

在深入学习本 notebook 之前,你需要:

🔲 📚 **通过完成第 1 单元,理解强化学习的基础知识**(MC、TD、奖励假设(reward hypothesis)等)

🔲 📚 **通过完成附加单元 1,阅读 Huggy 的简介**

## 设置 GPU 💪
- 为了**加速智能体(agent)的训练,我们将使用 GPU**。为此,请前往 `Runtime > Change Runtime type`

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step1.jpg" alt="GPU 步骤 1">

- `Hardware Accelerator > GPU`

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/gpu-step2.jpg" alt="GPU 步骤 2">

## 克隆仓库 🔽

- 我们需要克隆包含 **ML-Agents** 的仓库。

```bash
# 克隆仓库(可能需要 3 分钟)
git clone --depth 1 https://github.com/Unity-Technologies/ml-agents
```

## 设置虚拟环境 🔽

- 为了让 **ML-Agents** 在 Colab 中成功运行,Colab 的 Python 版本必须满足该库对 Python 版本的要求。

- 我们可以在 `setup.py` 文件中的 `python_requires` 参数下查看受支持的 Python 版本。这些文件是安装和使用 **ML-Agents** 库所必需的,位于以下位置:
  - `/content/ml-agents/ml-agents/setup.py`
  - `/content/ml-agents/ml-agents-envs/setup.py`

- Colab 当前的 Python 版本(可以用 `!python --version` 查看)与该库的 `python_requires` 参数不匹配,因此安装可能会静默失败,并导致稍后执行相同命令时出现类似下面这样的错误:
  - `/bin/bash: line 1: mlagents-learn: command not found`
  - `/bin/bash: line 1: mlagents-push-to-hf: command not found`

- 为了解决这个问题,我们将创建一个虚拟环境,让它的 Python 版本与 **ML-Agents** 库兼容。

`注意:` *为了今后的兼容性,请务必检查安装文件中的 `python_requires` 参数;如果 Colab 的 Python 版本不兼容,请在下面给出的脚本中把虚拟环境设置为受支持的最高 Python 版本*

```bash
# Colab 当前的 Python 版本(与 ML-Agents 不兼容)
!python --version
```

```bash
# 安装 virtualenv 并创建虚拟环境
!pip install virtualenv
!virtualenv myenv

# 下载并安装 Miniconda
!wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
!chmod +x Miniconda3-latest-Linux-x86_64.sh
!./Miniconda3-latest-Linux-x86_64.sh -b -f -p /usr/local

# 激活 Miniconda 并安装 Python 3.10.12 版本
!source /usr/local/bin/activate
!conda install -q -y --prefix /usr/local python=3.10.12 ujson  # 在这里指定版本

# 为 Python 和 conda 路径设置环境变量
!export PYTHONPATH=/usr/local/lib/python3.10/site-packages/
!export CONDA_PREFIX=/usr/local/envs/myenv
```

```bash
# 新虚拟环境中的 Python 版本(与 ML-Agents 兼容)
!python --version
```

## 安装依赖 🔽

```bash
# 进入仓库目录并安装包(可能需要 3 分钟)
%cd ml-agents
pip3 install -e ./ml-agents-envs
pip3 install -e ./ml-agents
```

## 下载环境 zip 文件,并移动到 `./trained-envs-executables/linux/`

- 我们的环境可执行文件位于一个 zip 文件中。
- 我们需要下载它,并放到 `./trained-envs-executables/linux/`

```bash
mkdir ./trained-envs-executables
mkdir ./trained-envs-executables/linux
```

我们使用 `wget` 从 https://github.com/huggingface/Huggy 下载了文件 Huggy.zip

```bash
wget "https://github.com/huggingface/Huggy/raw/main/Huggy.zip" -O ./trained-envs-executables/linux/Huggy.zip
```

```bash
%%capture
unzip -d ./trained-envs-executables/linux/ ./trained-envs-executables/linux/Huggy.zip
```

确保你的文件可访问

```bash
chmod -R 755 ./trained-envs-executables/linux/Huggy
```

## 我们来回顾一下这个环境是如何工作的

### 状态空间:Huggy 感知到了什么

Huggy 并不能"看到"它的环境。作为替代,我们向它提供关于环境的信息:

- 目标(木棍)的位置
- 它自身与目标之间的相对位置
- 它四条腿的朝向。

有了所有这些信息,Huggy **就能决定下一步采取什么动作来实现自己的目标**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/huggy.jpg" alt="Huggy" width="100%">


### 动作空间:Huggy 能做出的移动
<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/huggy-action.jpg" alt="Huggy 动作" width="100%">

**Huggy 的腿由关节电机驱动**。这意味着,为了拿到目标,Huggy 需要**学会正确地旋转每条腿的关节电机,才能移动起来**。

### 奖励函数

奖励函数的设计初衷是让 **Huggy 实现自己的目标**:捡回木棍。

请记住,强化学习的基石之一是*奖励假设*:一个目标可以被描述为**最大化期望累积奖励**。

在这里,我们的目标是让 Huggy **朝木棍跑去,但不要打转太多**。因此,我们的奖励函数必须把这一目标转化为奖励。

我们的奖励函数:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/reward.jpg" alt="Huggy 奖励函数" width="100%">

- *朝向奖励*:当它**接近目标时,我们给予它奖励**。
- *时间惩罚*:每次执行动作都会给一个固定的时间惩罚,以**迫使它尽快拿到木棍**。
- *旋转惩罚*:如果 Huggy **打转太多、转身太快**,我们就惩罚它。
- *到达目标奖励*:当 Huggy **到达目标**时,我们奖励它。

## 查看 Huggy 的配置文件

- 在 ML-Agents 中,你在 config.yaml 文件中定义**训练超参数(hyperparameters)**。

- 就本 notebook 的范围而言,我们不会去修改这些超参数,但如果你想把它当作一个实验来尝试,Unity 提供了非常[好的文档,对它们逐一进行了解释](https://github.com/Unity-Technologies/ml-agents/blob/main/docs/Training-Configuration-File.md)。

- 我们需要为 Huggy 创建一个配置文件。

- 前往 `/content/ml-agents/config/ppo`

- 创建一个名为 `Huggy.yaml` 的新文件

- 复制并粘贴以下内容 🔽

```
behaviors:
  Huggy:
    trainer_type: ppo
    hyperparameters:
      batch_size: 2048
      buffer_size: 20480
      learning_rate: 0.0003
      beta: 0.005
      epsilon: 0.2
      lambd: 0.95
      num_epoch: 3
      learning_rate_schedule: linear
    network_settings:
      normalize: true
      hidden_units: 512
      num_layers: 3
      vis_encode_type: simple
    reward_signals:
      extrinsic:
        gamma: 0.995
        strength: 1.0
    checkpoint_interval: 200000
    keep_checkpoints: 15
    max_steps: 2e6
    time_horizon: 1000
    summary_freq: 50000
```

- 别忘了保存文件!

- **如果你想修改超参数**,在 Google Colab notebook 中,你可以点击这里打开 config.yaml:`/content/ml-agents/config/ppo/Huggy.yaml`

现在,我们已经准备好训练智能体了 🔥。

## 训练我们的智能体

要训练智能体,我们只需要**启动 mlagents-learn,并选择包含环境的那个可执行文件**。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/mllearn.png" alt="mlagents-learn 命令" width="100%">

使用 ML-Agents 时,我们运行一个训练脚本,并定义四个参数:

1. `mlagents-learn <config>`:超参数配置文件所在的路径。
2. `--env`:环境可执行文件所在的位置。
3. `--run-id`:你希望给本次训练的 run id 起的名字。
4. `--no-graphics`:训练过程中不启动可视化界面。

训练模型,并使用 `--resume` 标志,以便在训练被中断后继续训练。

> 当你第一次使用 `--resume` 时会失败,重新运行一次这个代码块即可绕过该错误。



训练将耗时 30 到 45 分钟,具体取决于你的机器(别忘了**设置 GPU**)。去喝杯 ☕️ 吧,这是你应得的 🤗。

```bash
mlagents-learn ./config/ppo/Huggy.yaml --env=./trained-envs-executables/linux/Huggy/Huggy --run-id="Huggy" --no-graphics
```

## 把智能体推送到 🤗 Hub

- 现在我们已经训练好了智能体,**可以把它推送到 Hub,这样你就能在浏览器中和 Huggy 一起玩了 🔥。**

要与社区分享你的模型,还需要完成三个步骤:

1️⃣ (如果尚未注册)注册一个 HF 账号 ➡ https://huggingface.co/join

2️⃣ 登录,然后从 Hugging Face 网站获取你的 token。
- 创建一个新 token(https://huggingface.co/settings/tokens),**角色选择 write(写权限)**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/create-token.jpg" alt="创建 HF Token">

- 复制该 token
- 运行下面的单元格,并粘贴 token

```python
from huggingface_hub import notebook_login

notebook_login()
```

如果你不想使用 Google Colab 或 Jupyter Notebook,则需要改用这条命令:`huggingface-cli login`

然后,我们只需要运行 `mlagents-push-to-hf`。

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/mlpush.png" alt="mlagents-push-to-hf 命令" width="100%">

我们定义 4 个参数:

1. `--run-id`:训练 run id 的名称。
2. `--local-dir`:智能体保存的位置,即 results/<run_id 名称>,以我为例就是 results/First Training。
3. `--repo-id`:你想要创建或更新的 Hugging Face 仓库名称。它总是 <你的 Hugging Face 用户名>/<仓库名> 的形式。
如果该仓库不存在,**它会被自动创建**
4. `--commit-message`:由于 HF 仓库本身就是 git 仓库,你需要提供一条提交信息。

```bash
mlagents-push-to-hf --run-id="HuggyTraining" --local-dir="./results/Huggy" --repo-id="ThomasSimonini/ppo-Huggy" --commit-message="Huggy"
```

如果一切顺利,你应该会在流程结束时看到如下内容(不过 url 会不一样 😆):



```
Your model is pushed to the hub. You can view your model here: https://huggingface.co/ThomasSimonini/ppo-Huggy
```

这是指向你的模型仓库的链接。该仓库包含一个模型卡(model card),解释了如何使用这个模型,此外还有你的 Tensorboard 日志和配置文件。**最棒的是,它是一个 git 仓库,这意味着你可以拥有不同的提交、通过新的 push 更新你的仓库、发起 Pull Request 等等。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/modelcard.png" alt="模型卡" width="100%">

现在到了最精彩的部分:**能够在线和 Huggy 一起玩 👀。**

## 和你的 Huggy 一起玩 🐕

这一步最简单:

- 在浏览器中打开 Huggy 游戏:https://huggingface.co/spaces/ThomasSimonini/Huggy

- 点击 Play with my Huggy model

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/load-huggy.jpg" alt="load-huggy" width="100%">

1. 在第 1 步,输入你的用户名(用户名区分大小写:比如,我的用户名是 ThomasSimonini,而不是 thomassimonini 或 ThOmasImoNInI),然后点击搜索按钮。

2. 在第 2 步,选择你的模型仓库。

3. 在第 3 步,**选择你想回放的模型**:
  - 我这里有多个模型,因为我们每 500000 个时间步(timestep)保存一次模型。
  - 但由于我想要最新的那个,所以我选择 `Huggy.onnx`

👉 **多尝试不同训练步数保存的模型,看看智能体的进步**,这是很有益的。

恭喜你完成了这个附加单元!

现在你可以坐下来,尽情地和你的 Huggy 玩耍了 🐶。别忘了**把 Huggy 分享给你的朋友们,把这份爱传递出去 🤗**。如果你在社交媒体上分享,**请 @ 我们 @huggingface 和我 @simoninithomas**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/notebooks/unit-bonus1/huggy-cover.jpeg" alt="Huggy cover" width="100%">


## 保持学习,保持出色 🤗
