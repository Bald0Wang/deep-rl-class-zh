> 🌐 本文为 [Hugging Face Deep RL 课程](https://huggingface.co/learn/deep-rl-course)中文翻译。
> 原文:[units/en/unitbonus5/train-our-robot.mdx](https://github.com/huggingface/deep-rl-class/blob/main/units/en/unitbonus5/train-our-robot.mdx)
> 译文由 AI 生成,仅供学习交流,原文以 Apache-2.0 许可发布。

# 训练我们的机器人

<Tip>
要开始训练,我们首先需要在你安装 Godot RL Agents 的同一个 venv / conda 环境中安装 <a href="https://imitation.readthedocs.io/en/latest/getting-started/installation.html">imitation</a> 库,使用的命令是:<code>pip install imitation</code>
</Tip>

### 从 Godot RL 仓库下载一份[模仿学习](https://github.com/edbeeching/godot_rl_agents/blob/main/examples/sb3_imitation.py)脚本。

### 使用下面的参数运行训练:

```python
sb3_imitation.py --env_path="path_to_ILTutorial_executable" --bc_epochs=100 --gail_timesteps=1450000 --demo_files "path_to_expert_demos.json" --n_parallel=4 --speedup=20 --onnx_export_path=model.onnx --experiment_name=ILTutorial
```

**把 env 路径设置为导出的游戏,demo 文件路径设置为录制的示范。如果有多个示范文件,用空格分隔依次添加即可,例如 `--demo_files demos.json demos2.json`。**

你也可以为 `--gail_timesteps` 设置一个较大的时间步数,然后手动按 `CTRL+C` 停止训练。我就是用这种方法在奖励开始接近 3 时停止训练的,当时是 `total_timesteps | 1.38e+06`。在我的电脑上(使用 CPU 训练),这一过程花了约 41 分钟,而 BC(行为克隆,Behavior Cloning)预训练花了约 5.5 分钟。

如果想边训练边观察环境,可以添加 `--viz` 参数。在 BC 训练期间,环境画面会保持静止,因为这个阶段除了获取观测(observation)空间和动作(action)空间的一些信息之外并不使用环境。到了 GAIL(生成对抗式模仿学习)训练阶段,环境画面就会开始更新。

下面是使用 [tensorboard](https://github.com/edbeeching/godot_rl_agents/blob/main/docs/TRAINING_STATISTICS.md) 展示的日志中的 `ep_rew_mean` 和 `ep_rew_wrapped_mean` 统计曲线,可以看到在本例中二者非常接近:

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/
en/unit13/training_results.png" alt="训练结果"/>


<Tip>
你可以在启动训练时所在路径下的 `logs/ILTutorial` 中找到日志。如果要进行多次训练,每次之间请修改 `--experiment_name` 参数。
</Tip>

尽管设置环境奖励(reward)在这里并非必需、也没有用于本次训练,但我们还是实现了一个简单的稀疏奖励来追踪成功与否。掉到地图之外、水里或陷阱中会执行 `reward += -1`,而拉动拉杆、收集钥匙和打开宝箱则分别执行 `reward += 1`。如果 `ep_rew_mean` 接近 3,就说明结果不错。`ep_rew_wrapped_mean` 是来自 GAIL 判别器(discriminator)的奖励,它并不能直接告诉我们智能体解决环境任务的成功程度。

### 我们来测试训练好的智能体

训练完成后,你会在启动训练脚本所在的文件夹中找到一个 `model.onnx` 文件(也可以在控制台训练日志接近末尾的地方找到 `.onnx` 文件的完整路径)。**把它复制到 Godot 游戏项目文件夹中。**

### 打开 onnx 推理场景

这个场景和示范录制场景一样,只使用一份关卡。它的 `Sync` 节点模式同样被设为 `Onnx Inference`。

**点击 `Sync` 节点,把 `Onnx Model Path` 属性设置为 `model.onnx`。**

<img src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/
en/unit13/onnx_inference_scene.jpg" alt="onnx 推理场景"/>

**按下 F6 启动这个场景,看看智能体到底学会了什么吧!**

训练好的智能体的视频:

<video src="https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit13/onnx_inference_test.mp4" type="video/mp4" controls autoplay loop mute />

看起来智能体能够从两个位置(左侧平台或右侧平台)收集钥匙,并且很好地复现了录制的示范行为。**如果你的结果与此类似,干得漂亮,你已经成功完成了本教程!** 🏆👏

如果你的结果差别很大,请注意录制的示范数量和质量都会影响结果,调整 BC/GAIL 阶段的步数以及修改 Python 脚本中的超参数也可能会有帮助。此外,每次运行之间还存在一定的随机差异,因此即使设置完全相同,结果有时也会略有不同。
