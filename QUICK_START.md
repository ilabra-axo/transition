# Quick Start Guide
**Get running in 5 minutes**

---

## ⚡ Step 1: Download (30 seconds)

```bash
git clone https://github.com/ilabra-axo/transition.git
cd transition
```

**OR** download ZIP from: https://github.com/ilabra-axo/transition

---

## 🌐 Step 2: View Website (30 seconds)

**Double-click this file:**
```
transition/agents/sdv-suite/index.html
```

**OR from terminal:**
```bash
# Mac
open agents/sdv-suite/index.html

# Windows
start agents\sdv-suite\index.html

# Linux
xdg-open agents/sdv-suite/index.html
```

✅ **Done!** Browse agents, projects, and documentation.

---

## 🤖 Step 3: Run First Agent (4 minutes)

### Get API Key
1. Sign up: https://console.anthropic.com/
2. Create API key
3. Copy it

### Set Up Python
```bash
# Install dependencies
pip install anthropic

# Set API key (Mac/Linux)
export ANTHROPIC_API_KEY="your-key-here"

# Set API key (Windows)
setx ANTHROPIC_API_KEY "your-key-here"
```

### Test Agent
Create `test.py`:
```python
import json
from anthropic import Anthropic

client = Anthropic()

with open('agents/sdv-suite/cards/sensor_fusion_analyst.json') as f:
    agent = json.load(f)

response = client.messages.create(
    model=agent['executor']['config']['model'],
    max_tokens=4096,
    temperature=0.3,
    system=agent['executor']['config']['system_prompt'],
    messages=[{"role": "user", "content": "Analyze 3 cameras + 2 radars for L2+ ADAS"}]
)

print(response.content[0].text)
```

Run it:
```bash
python test.py
```

✅ **Success!** You just ran your first AI agent.

---

## 📚 Next Steps

- **Read:** [README.md](README.md) - Complete overview
- **Deploy:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Full setup
- **Use:** [agents/QUICK_REFERENCE.md](agents/QUICK_REFERENCE.md) - Query patterns
- **BCS Projects:** [BCS_PROJECT_CONTINUITY_GUIDE.md](BCS_PROJECT_CONTINUITY_GUIDE.md)

---

## 💡 What You Have

**8 AI Agents:**
- SDV Architecture Validator
- Sensor Fusion Analyst  
- HMI/UX Forecaster
- Virtual Sensor Designer
- Automotive Tech Scout
- Signal Processing Advisor
- Optical Sensor Specialist
- Connectivity Standards Tracker

**Documentation:**
- Complete BCS transition materials
- rain light sensor research report
- Patent & market analysis
- Multi-agent workflow examples

**Interactive Website:**
- Browse all agents and projects
- See usage examples
- Access all documentation

---

## ❓ Need Help?

**Can't find something?** Check [README.md](README.md)  
**Setup issues?** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)  
**Agent usage?** Read [agents/QUICK_REFERENCE.md](agents/QUICK_REFERENCE.md)

---

**That's it! You're ready to go.** 🚀