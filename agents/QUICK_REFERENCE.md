# SDV Agent Suite - Quick Reference Guide

**Version:** 1.0 | **Updated:** 2024-02-07 | **Author:** Alena Taranka

---

## Agent Selection Guide

Use this table to quickly identify which agent(s) to use:

| Your Question Involves... | Use This Agent | Typical Response Time |
|--------------------------|----------------|----------------------|
| System architecture validation, AUTOSAR, ASIL compliance | **SDV Architecture Validator** | 30s |
| Sensor suite design, FOV coverage, redundancy | **Sensor Fusion Analyst** | 25s |
| HMI trends, display tech, user interaction | **HMI/UX Forecaster** | 45s |
| Replacing hardware sensors with software | **Virtual Sensor Designer** | 35s |
| Emerging technologies, patents, startups | **Automotive Tech Scout** | 60s |
| Signal processing algorithms, filters, compute | **Signal Processing Advisor** | 20s |
| Camera/LiDAR selection, optical design | **Optical Sensor Specialist** | 25s |
| V2X, Ethernet, OTA, connectivity standards | **Connectivity Standards Tracker** | 30s |

---

## Common Query Patterns

### Pattern 1: Validation Query
**Format:** "Validate [architecture/design] against [standard/requirement]"

**Example:**
```
Validate a zonal architecture with 3 zone controllers and 1 central compute 
unit for L3 autonomous driving. Evaluate compliance with AUTOSAR Adaptive 
R22-11 and ISO 26262 ASIL-D requirements.
```

**Best Agent:** SDV Architecture Validator

---

### Pattern 2: Design/Optimization Query
**Format:** "Design/optimize [system] for [use case] with [constraints]"

**Example:**
```
Design a sensor suite for L2+ highway pilot with:
- Cost target: $800
- Safety: ASIL-B required
- Environment: North American highways (rain, snow, night driving)
Recommend sensors, placement, and redundancy strategy.
```

**Best Agent:** Sensor Fusion Analyst

---

### Pattern 3: Forecast Query
**Format:** "What is the likelihood of [technology] adoption by [timeframe] in [market]?"

**Example:**
```
Forecast the adoption of solid-state LiDAR in premium vehicles over 
the next 5 years. Include cost trajectory, technology maturity, and 
competitive landscape.
```

**Best Agents:** Automotive Tech Scout + HMI/UX Forecaster (if HMI-related)

---

### Pattern 4: Feasibility Query
**Format:** "Evaluate feasibility of [concept] given [constraints]"

**Example:**
```
Evaluate feasibility of replacing rear corner radars with camera-based 
virtual sensing. Available sensors: 2 rear cameras (120° FOV). 
Target: 100m detection range, ASIL-B compliance. Cost savings target: $150/vehicle.
```

**Best Agent:** Virtual Sensor Designer

---

### Pattern 5: Comparison Query
**Format:** "Compare [option A] vs [option B] for [use case]"

**Example:**
```
Compare mechanical scanning LiDAR vs solid-state LiDAR for L3 urban 
autonomous driving. Consider cost, reliability, performance in rain/fog, 
and 2025-2027 availability.
```

**Best Agent:** Optical Sensor Specialist

---

## Multi-Agent Workflows

### Workflow 1: Complete System Design
```
Query → Sensor Fusion Analyst (sensor suite)
      → Optical Sensor Specialist (detailed specs)
      → Signal Processing Advisor (compute requirements)
      → SDV Architecture Validator (system validation)
      → Synthesis Report
```

**Use Case:** Design a complete ADAS/AD system from scratch

---

### Workflow 2: Technology Roadmap
```
Query → Automotive Tech Scout (emerging tech)
      → HMI/UX Forecaster (adoption timeline)
      → Connectivity Standards Tracker (standards evolution)
      → Synthesis Report
```

**Use Case:** Build a 3-5 year technology roadmap

---

### Workflow 3: Cost Optimization
```
Query → Sensor Fusion Analyst (baseline analysis)
      → Virtual Sensor Designer (sensor elimination opportunities)
      → SDV Architecture Validator (safety validation)
      → Cost-Benefit Report
```

**Use Case:** Reduce sensor costs while maintaining safety

---

## Query Best Practices

### ✅ DO

1. **Provide context:** Vehicle type, use case, development phase
2. **Specify constraints:** Cost, timeline, safety requirements, regulations
3. **Define success criteria:** Accuracy targets, performance goals
4. **Request justification:** Ask for sources, confidence scores, assumptions
5. **Be specific:** "L3 highway pilot" not "autonomous car"

### ❌ DON'T

1. **Don't ask for proprietary data:** Agent can't access OEM internal roadmaps
2. **Don't expect real-world testing:** Agents analyze, they don't test hardware
3. **Don't use for safety-critical decisions alone:** Require expert review for ASIL-C/D
4. **Don't assume perfect accuracy:** Always check confidence scores
5. **Don't omit critical constraints:** Cost, timeline, regulations matter

---

## Sample Queries by Domain

### ADAS/Autonomous Driving
```
"Analyze sensor suite for L4 urban robotaxi: 8 cameras, 5 radars, 2 LiDARs. 
Evaluate 360° coverage, redundancy for ASIL-D, and blind spot identification."
```

### HMI/Cockpit
```
"Forecast adoption of micro-LED instrument clusters in mass-market vehicles 
by 2028. Include cost trajectory, supplier ecosystem, and regulatory considerations."
```

### System Architecture
```
"Validate service-oriented architecture for OTA software updates with 
AUTOSAR Adaptive. Requirements: fail-safe rollback, ASIL-B integrity, 
1 GB update size under 10 minutes."
```

### Sensor Technology
```
"Compare 4D imaging radar vs traditional radar for parking assist. 
Consider resolution, cost, form factor, and availability in 2025."
```

### Virtual Sensing
```
"Design virtual road friction sensor using camera (road surface analysis), 
radar (spray detection), and IMU (vehicle dynamics). Target: ASIL-C, 
update rate 10 Hz, accuracy ±15%."
```

---

## Confidence Score Interpretation

| Score | Meaning | Action |
|-------|---------|--------|
| 90-100% | High confidence, strong evidence | Proceed with recommendation, validate with expert |
| 70-89% | Moderate confidence, reasonable assumptions | Use as guidance, cross-check critical points |
| 50-69% | Low confidence, limited data | Treat as hypothesis, conduct further research |
| <50% | Speculative, high uncertainty | Consider exploratory only, validate independently |

---

## Common Error Scenarios

### "Insufficient Information"
**Cause:** Missing critical inputs (sensor specs, cost targets, safety requirements)  
**Fix:** Provide more detail; agent will state assumptions if needed

### "Outside Scope"
**Cause:** Query requires capabilities the agent doesn't have  
**Fix:** Use a different agent or break into sub-queries

### "Conflicting Requirements"
**Cause:** Impossible constraints (e.g., L5 autonomy with $100 sensor budget)  
**Fix:** Agent will flag infeasibility and explain tradeoffs

### "Outdated Information"
**Cause:** Query about very recent developments (post-training cutoff)  
**Fix:** Agent will note knowledge cutoff; validate with current sources

---

## Performance Optimization

### For Faster Responses
- Use **Signal Processing Advisor** or **Optical Sensor Specialist** for focused technical questions (20-25s)
- Avoid **Automotive Tech Scout** for simple queries (60s average)

### For Lower Costs
- Use Claude Haiku for simple validation queries ($0.05 vs $0.15)
- Cache repeated queries (e.g., standard ADAS sensor configurations)
- Batch similar queries (e.g., evaluate 3 sensor suites in one session)

### For Higher Accuracy
- Provide detailed specifications and constraints
- Request multiple scenarios (optimistic/base/pessimistic)
- Cross-validate with multiple agents for critical decisions
- Ask for confidence justification and source citations

---

## Integration Shortcuts

### Python (Quick Start)
```python
import json
from anthropic import Anthropic

def query_agent(agent_id, query):
    client = Anthropic()
    with open(f'cards/{agent_id}.json') as f:
        agent = json.load(f)
    
    response = client.messages.create(
        model=agent['executor']['config']['model'],
        max_tokens=agent['executor']['config']['max_tokens'],
        temperature=agent['executor']['config']['temperature'],
        system=agent['executor']['config']['system_prompt'],
        messages=[{"role": "user", "content": query}]
    )
    
    return response.content[0].text

# Usage
result = query_agent('sensor_fusion_analyst', 'Analyze sensor suite...')
print(result)
```

### CLI (One-Liner)
```bash
export AGENT="sdv_arch_validator"
export QUERY="Validate zonal architecture..."
python -c "from query_agent import query_agent; print(query_agent('$AGENT', '$QUERY'))"
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Response too generic | Add more constraints and context to query |
| JSON parse errors | Check agent card syntax; validate with `jq` |
| Timeout errors | Increase max_tokens or simplify query |
| Contradictory outputs | Check confidence scores; agents may disagree validly |
| Missing sources | Request explicitly: "Cite technical sources for each claim" |

---

## Agent Card File Locations

```
transition/agents/sdv-suite/cards/
├── sdv_arch_validator.json
├── sensor_fusion_analyst.json
├── hmi_ux_forecaster.json
├── virtual_sensor_designer.json
├── automotive_tech_scout.json         (coming soon)
├── signal_processing_advisor.json     (coming soon)
├── optical_sensor_specialist.json     (coming soon)
└── connectivity_standards_tracker.json (coming soon)
```

---

## Quick Cheat Sheet

**Need to validate an architecture?** → SDV Architecture Validator  
**Need to design a sensor suite?** → Sensor Fusion Analyst  
**Need to forecast HMI trends?** → HMI/UX Forecaster  
**Need to replace hardware with software?** → Virtual Sensor Designer  
**Need to track emerging tech?** → Automotive Tech Scout  
**Need algorithm recommendations?** → Signal Processing Advisor  
**Need camera/LiDAR expertise?** → Optical Sensor Specialist  
**Need connectivity standards info?** → Connectivity Standards Tracker

---

## Next Steps

1. **Read:** [README.md](sdv-suite/README.md) for detailed setup
2. **Review:** [SDV_AGENT_SYSTEM_DESIGN.md](sdv-suite/SDV_AGENT_SYSTEM_DESIGN.md) for architecture
3. **Test:** Run example queries from agent cards
4. **Customize:** Adjust system prompts for your specific needs
5. **Deploy:** Integrate into your R&D workflow

---

## Support

- **Documentation:** See `sdv-suite/` directory
- **Examples:** Check `examples/` folder (coming soon)
- **Issues:** Review agent limitations in individual cards

---

**Pro Tip:** Start with a single agent for a known problem. Compare the output to your own analysis. This builds confidence in the system and helps you learn optimal query patterns.

---

*Last Updated: 2024-02-07 | SDV Agent Suite v1.0*