# Deployment Guide
## Local Setup for BCS Knowledge Transfer Package

**Version:** 1.0.0  
**Last Updated:** February 2024  
**Purpose:** Get the SDV Agent Suite running on your local machine

---

## 🎯 Quick Start (5 Minutes)

### What You'll Need
- A computer (Windows, Mac, or Linux)
- Internet connection
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime, Notepad++, or any editor)

### What You'll Get
- Interactive website running locally
- 8 AI research agents ready to use
- Complete documentation package
- All BCS project materials

---

## 📥 Step 1: Download the Package

### Option A: Download from GitHub (Recommended)

```bash
# Clone the repository
git clone https://github.com/ilabra-axo/transition.git

# Navigate to the folder
cd transition
```

### Option B: Download ZIP File

1. Go to: https://github.com/ilabra-axo/transition
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to your desired location
5. Open terminal/command prompt in that folder

---

## 🌐 Step 2: View the Website Locally

### Method 1: Simple File Open (No Server Required)

**For Windows:**
```bash
# Navigate to the website file
cd agents\sdv-suite

# Open in default browser
start index.html
```

**For Mac:**
```bash
# Navigate to the website file
cd agents/sdv-suite

# Open in default browser
open index.html
```

**For Linux:**
```bash
# Navigate to the website file
cd agents/sdv-suite

# Open in default browser
xdg-open index.html
```

**Or simply:**
- Navigate to `transition/agents/sdv-suite/` folder
- Double-click `index.html`
- Website opens in your browser!

---

### Method 2: Local Web Server (Optional, Better Performance)

**Using Python (if installed):**
```bash
# Navigate to the package root
cd transition

# Start a simple web server
python3 -m http.server 8000

# OR for Python 2
python -m SimpleHTTPServer 8000
```

Then open browser to: **http://localhost:8000/agents/sdv-suite/**

**Using Node.js (if installed):**
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to package root
cd transition

# Start server
http-server -p 8000
```

Then open browser to: **http://localhost:8000/agents/sdv-suite/**

---

## 🤖 Step 3: Set Up AI Agents (For Active Use)

### Prerequisites for Agent Use

**Required:**
- Anthropic Claude API key
- Python 3.9 or higher
- Basic Python libraries

### Get Your API Key

1. **Sign up for Anthropic Claude API:**
   - Go to: https://console.anthropic.com/
   - Create an account
   - Navigate to API Keys section
   - Generate a new API key
   - Copy and save it securely

2. **Estimated Costs:**
   - Claude 3.5 Sonnet: ~$0.10-$0.25 per agent query
   - Monthly budget estimate: $50-200 depending on usage
   - See pricing: https://www.anthropic.com/pricing

### Install Python Dependencies

```bash
# Install required packages
pip install anthropic python-dotenv

# Verify installation
python -c "import anthropic; print('Success!')"
```

### Configure API Key

**Option A: Environment Variable (Recommended)**

**For Mac/Linux:**
```bash
# Add to your shell profile (~/.bashrc, ~/.zshrc, or ~/.bash_profile)
export ANTHROPIC_API_KEY="your-api-key-here"

# Apply changes
source ~/.bashrc  # or ~/.zshrc
```

**For Windows (Command Prompt):**
```cmd
setx ANTHROPIC_API_KEY "your-api-key-here"
```

**For Windows (PowerShell):**
```powershell
$env:ANTHROPIC_API_KEY="your-api-key-here"
```

**Option B: .env File**

Create a file named `.env` in the `transition/` folder:
```bash
ANTHROPIC_API_KEY=your-api-key-here
```

---

## ▶️ Step 4: Run Your First Agent Query

### Quick Test Script

Create a file called `test_agent.py` in the `transition/` folder:

```python
import json
from anthropic import Anthropic

# Initialize client
client = Anthropic()  # Uses ANTHROPIC_API_KEY from environment

# Load an agent card
with open('agents/sdv-suite/cards/sensor_fusion_analyst.json') as f:
    agent = json.load(f)

# Prepare a test query
query = """
Analyze a sensor suite for L2+ highway pilot:
- 3 front cameras (1 telephoto 50° FOV, 2 wide 120° FOV)
- 5 radars (1 long-range 250m, 4 corner 100m)
- 1 LiDAR (solid-state, 120° FOV, 150m range)

Evaluate 360° coverage and identify any blind spots.
Target: ASIL-B safety compliance.
"""

print("🤖 Running Sensor Fusion Analyst...")
print("Query:", query[:100] + "...")

# Execute agent
response = client.messages.create(
    model=agent['executor']['config']['model'],
    max_tokens=agent['executor']['config']['max_tokens'],
    temperature=agent['executor']['config']['temperature'],
    system=agent['executor']['config']['system_prompt'],
    messages=[{"role": "user", "content": query}]
)

# Display result
print("\n" + "="*60)
print("AGENT RESPONSE:")
print("="*60)
print(response.content[0].text)
print("\n✅ Agent query successful!")
```

### Run the Test

```bash
# Navigate to transition folder
cd transition

# Run the test script
python test_agent.py
```

**Expected Output:**
- Agent analyzes the sensor suite
- Provides coverage assessment
- Identifies blind spots
- Recommends improvements
- Includes confidence score and sources

---

## 📚 Step 5: Explore Documentation

All documentation is in Markdown format and can be read in any text editor or browser.

### Start Here

1. **Main README**
   ```bash
   # Mac/Linux
   open README.md
   
   # Windows
   start README.md
   
   # Or open in VS Code
   code README.md
   ```

2. **Transition Dashboard** (master knowledge map)
   - File: `TRANSITION_DASHBOARD.md`
   - Maps all BCS work areas to artifacts

3. **Quick Reference** (practical usage)
   - File: `agents/QUICK_REFERENCE.md`
   - Query patterns and examples

4. **BCS Project Continuity**
   - File: `BCS_PROJECT_CONTINUITY_GUIDE.md`
   - Active projects and handoffs

### Documentation Tree

```
transition/
├── README.md                          ← Start here
├── TRANSITION_DASHBOARD.md            ← Work area mapping
├── BCS_PROJECT_CONTINUITY_GUIDE.md    ← Project handoffs
├── DEPLOYMENT_GUIDE.md                ← You are here
├── QUICK_REFERENCE.md                 ← Usage patterns
│
├── agents/
│   ├── INDEX.md
│   ├── QUICK_REFERENCE.md
│   ├── SDV_AGENT_SUITE_EXECUTIVE_SUMMARY.md
│   └── sdv-suite/
│       ├── index.html                 ← Interactive website
│       ├── README.md
│       ├── SDV_AGENT_SYSTEM_DESIGN.md
│       └── cards/*.json               ← Agent definitions
│
└── [Research Artifacts]
    ├── digital-twin-rain-light-sensor.md
    ├── patent_research.md
    └── ...
```

---

## 🔧 Step 6: Use Agents in Your Workflow

### Example Workflow: Customer RFQ Response

**Scenario:** OEM requests sensor suite design for L2+ system

```python
import json
from anthropic import Anthropic

client = Anthropic()

# Step 1: Load Sensor Fusion Analyst
with open('agents/sdv-suite/cards/sensor_fusion_analyst.json') as f:
    sensor_agent = json.load(f)

# Step 2: Prepare customer query
customer_query = """
Design sensor suite for highway pilot (L2+):
- Cost target: $600 per vehicle
- Detection range: 250m forward, 100m lateral
- Operating conditions: day/night, rain, fog
- Safety: ASIL-B required
- Regional: North American market (FMVSS compliance)

Recommend sensor types, quantities, and placement.
"""

# Step 3: Get baseline design
response = client.messages.create(
    model=sensor_agent['executor']['config']['model'],
    max_tokens=4096,
    temperature=0.3,
    system=sensor_agent['executor']['config']['system_prompt'],
    messages=[{"role": "user", "content": customer_query}]
)

baseline_design = response.content[0].text

# Step 4: Save results
with open('customer_rfq_response.txt', 'w') as f:
    f.write("BASELINE SENSOR SUITE DESIGN\n")
    f.write("="*60 + "\n\n")
    f.write(baseline_design)

print("✅ Results saved to: customer_rfq_response.txt")
```

### Multi-Agent Workflow

Chain multiple agents together:

```python
# 1. Sensor Fusion Analyst → baseline design
# 2. Virtual Sensor Designer → cost optimization
# 3. SDV Architecture Validator → safety validation

# Load all agents
agents = {}
for agent_id in ['sensor_fusion_analyst', 'virtual_sensor_designer', 'sdv_arch_validator']:
    with open(f'agents/sdv-suite/cards/{agent_id}.json') as f:
        agents[agent_id] = json.load(f)

# Sequential workflow
results = {}
results['baseline'] = query_agent(agents['sensor_fusion_analyst'], customer_query)
results['optimized'] = query_agent(agents['virtual_sensor_designer'], 
                                    f"Optimize this design: {results['baseline']}")
results['validated'] = query_agent(agents['sdv_arch_validator'], 
                                    f"Validate safety: {results['optimized']}")

# Final synthesis
print(results['validated'])
```

---

## ⚙️ Advanced Setup (Optional)

### Create Helper Scripts

**File: `query_agent.py`**

```python
#!/usr/bin/env python3
"""
Simple command-line interface for querying agents
Usage: python query_agent.py <agent_id> "Your query here"
"""

import sys
import json
from anthropic import Anthropic

def query_agent(agent_id, query_text):
    client = Anthropic()
    
    # Load agent card
    with open(f'agents/sdv-suite/cards/{agent_id}.json') as f:
        agent = json.load(f)
    
    # Execute query
    response = client.messages.create(
        model=agent['executor']['config']['model'],
        max_tokens=agent['executor']['config']['max_tokens'],
        temperature=agent['executor']['config']['temperature'],
        system=agent['executor']['config']['system_prompt'],
        messages=[{"role": "user", "content": query_text}]
    )
    
    return response.content[0].text

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python query_agent.py <agent_id> 'Your query'")
        print("\nAvailable agents:")
        print("  - sensor_fusion_analyst")
        print("  - sdv_arch_validator")
        print("  - hmi_ux_forecaster")
        print("  - virtual_sensor_designer")
        print("  - automotive_tech_scout")
        sys.exit(1)
    
    agent_id = sys.argv[1]
    query = sys.argv[2]
    
    print(f"🤖 Querying {agent_id}...")
    result = query_agent(agent_id, query)
    print("\n" + "="*60)
    print(result)
    print("="*60)
```

Make it executable:
```bash
chmod +x query_agent.py

# Use it
python query_agent.py sensor_fusion_analyst "Analyze 3 camera + 2 radar setup for parking assist"
```

---

## 🚨 Troubleshooting

### Issue: "Module 'anthropic' not found"

**Solution:**
```bash
pip install anthropic
# OR
pip3 install anthropic
```

### Issue: "API Key not found"

**Solution:**
```bash
# Check if environment variable is set
echo $ANTHROPIC_API_KEY  # Mac/Linux
echo %ANTHROPIC_API_KEY%  # Windows CMD

# If empty, set it:
export ANTHROPIC_API_KEY="your-key"  # Mac/Linux
setx ANTHROPIC_API_KEY "your-key"    # Windows
```

### Issue: "Website styles not loading"

**Solution:**
- Use a local web server instead of opening file directly
- Try: `python3 -m http.server 8000`
- Then visit: `http://localhost:8000/agents/sdv-suite/`

### Issue: "Agent response too slow"

**Possible causes:**
- Large/complex query → reduce scope
- Network latency → check connection
- API rate limits → wait 1-2 minutes

**Optimization:**
- Use Claude Haiku for simple queries (faster, cheaper)
- Cache repeated queries
- Batch similar analyses

### Issue: "Agent gives generic answers"

**Solution:**
- Provide more specific details in query
- Include constraints (cost, timeline, standards)
- Reference specific technologies or requirements
- See examples in `agents/QUICK_REFERENCE.md`

---

## 📊 System Requirements

### Minimum Requirements
- **OS:** Windows 10, macOS 10.14+, or Linux (any modern distro)
- **Browser:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Python:** 3.9+ (only if using agents)
- **RAM:** 4GB+
- **Storage:** 500MB for package + dependencies

### Recommended for Best Experience
- **Python:** 3.11+
- **RAM:** 8GB+
- **Text Editor:** VS Code with Markdown preview
- **Internet:** Stable connection for API calls

---

## 💰 Cost Estimates

### One-Time Setup
- **Free:** Download and local deployment
- **Free:** Anthropic API account (pay as you go)

### Ongoing Usage (Claude 3.5 Sonnet)
- **Simple query:** $0.02 - $0.05
- **Complex analysis:** $0.10 - $0.25
- **Multi-agent workflow:** $0.50 - $1.50

**Monthly Estimates:**
- **Light use** (10-20 queries/month): $5-10
- **Medium use** (50-100 queries/month): $25-50
- **Heavy use** (200+ queries/month): $100-200

**Cost Optimization:**
- Use Claude Haiku for simple queries (5x cheaper)
- Cache and reuse results
- Batch similar analyses

---

## 🔒 Security Best Practices

### API Key Protection

**DO:**
- ✅ Store API key in environment variables
- ✅ Use `.env` file (add to `.gitignore`)
- ✅ Rotate keys periodically
- ✅ Use separate keys for dev/prod

**DON'T:**
- ❌ Hardcode API key in scripts
- ❌ Commit API key to version control
- ❌ Share API key via email/chat
- ❌ Use same key across multiple projects

### Data Privacy

**For BCS Internal Use:**
- Agents can process proprietary data (data is not used for training)
- See Anthropic privacy policy: https://www.anthropic.com/legal/privacy
- For highly sensitive data, consider self-hosted LLM solutions

**Customer Data:**
- Sanitize customer names/details when possible
- Use generic descriptors (e.g., "Premium OEM" vs actual name)
- Review Anthropic's enterprise agreement if needed

---

## 📖 Quick Reference Commands

### Essential Commands

```bash
# Clone repository
git clone https://github.com/ilabra-axo/transition.git

# View website locally
cd transition/agents/sdv-suite && open index.html

# Start local server
python3 -m http.server 8000

# Install dependencies
pip install anthropic python-dotenv

# Test agent
python test_agent.py

# Update from GitHub
git pull origin main
```

### File Locations

```bash
# Main documentation
transition/README.md

# Interactive website
transition/agents/sdv-suite/index.html

# Agent cards
transition/agents/sdv-suite/cards/*.json

# BCS project info
transition/BCS_PROJECT_CONTINUITY_GUIDE.md

# Research artifacts
transition/digital-twin-rain-light-sensor.md
```

---

## 🎯 Next Steps After Deployment

### Week 1: Familiarization
1. ✅ Browse all documentation
2. ✅ View website locally
3. ✅ Read BCS project continuity guide
4. ✅ Test one agent with sample query

### Week 2: Integration
5. ✅ Apply agent to real BCS project
6. ✅ Measure time savings
7. ✅ Share with team
8. ✅ Gather feedback

### Week 3-4: Customization
9. ✅ Modify agent prompts for BCS use cases
10. ✅ Create helper scripts for common workflows
11. ✅ Document BCS-specific examples
12. ✅ Train team members

---

## 🆘 Getting Help

### Documentation
- **Main README:** `README.md`
- **Quick Reference:** `agents/QUICK_REFERENCE.md`
- **System Design:** `agents/sdv-suite/SDV_AGENT_SYSTEM_DESIGN.md`

### Troubleshooting
- Check this deployment guide first
- Review agent card limitations
- Verify API key and connectivity
- Try simpler test query

### External Resources
- **Anthropic Docs:** https://docs.anthropic.com/
- **Python Setup:** https://www.python.org/downloads/
- **Git Guide:** https://git-scm.com/book/en/v2

---

## ✅ Deployment Checklist

**Before you start:**
- [ ] Computer with internet connection
- [ ] Text editor installed
- [ ] Terminal/command prompt access

**Basic deployment (view docs/website):**
- [ ] Package downloaded/cloned
- [ ] Website opened in browser
- [ ] Documentation accessible

**Full deployment (use agents):**
- [ ] Python 3.9+ installed
- [ ] Anthropic API key obtained
- [ ] Dependencies installed (`pip install anthropic`)
- [ ] API key configured (environment variable)
- [ ] Test agent query successful

**BCS integration:**
- [ ] Team members trained
- [ ] Agent applied to real project
- [ ] Time savings measured
- [ ] Feedback collected

---

## 🎉 Success!

If you can:
- ✅ Open the website in your browser
- ✅ Read the documentation
- ✅ Run a test agent query
- ✅ Get meaningful results

**You're ready to use the SDV Agent Suite!**

Start with the [Quick Reference Guide](agents/QUICK_REFERENCE.md) for practical usage examples.

---

**Last Updated:** February 2024  
**Version:** 1.0.0  
**Support:** See documentation package for comprehensive guides