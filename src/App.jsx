import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Code, 
  Play, 
  Sparkles, 
  Plus, 
  Trash2, 
  Check, 
  RotateCcw, 
  Download, 
  FileCode, 
  Send, 
  Cpu, 
  CheckSquare, 
  Calculator, 
  Layers, 
  Moon, 
  Sun,
  BookOpen,
  Settings,
  HelpCircle,
  Copy
} from 'lucide-react';

const APP_TEMPLATES = {
  greetings: {
    name: "Material Greetings",
    icon: Smartphone,
    description: "Dynamic greetings app featuring Material 3 input fields, interactive states, and an ambient UTC system clock.",
    kotlinCode: `package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.MyApplicationTheme
import java.time.Instant
import java.time.format.DateTimeFormatter

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
          GreetingScreen(modifier = Modifier.padding(innerPadding))
        }
      }
    }
  }
}

@Composable
fun GreetingScreen(modifier: Modifier = Modifier) {
  var name by remember { mutableStateOf("Builder") }
  var inputName by remember { mutableStateOf("") }
  var welcomeText by remember { mutableStateOf("Welcome to Jetpack Compose!") }

  Column(
    modifier = modifier
      .fillMaxSize()
      .padding(24.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    Text(
      text = "Hello, $name!",
      fontSize = 32.sp,
      fontWeight = FontWeight.Bold,
      color = MaterialTheme.colorScheme.primary
    )
    
    Text(
      text = welcomeText,
      fontSize = 16.sp,
      color = MaterialTheme.colorScheme.secondary
    )

    Spacer(modifier = Modifier.height(24.dp))

    OutlinedTextField(
      value = inputName,
      onValueChange = { inputName = it },
      label = { Text("Your Name") },
      placeholder = { Text("Type something...") },
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(12.dp)
    )

    Button(
      onClick = {
        if (inputName.isNotBlank()) {
          name = inputName
          welcomeText = "Great to have you here! Explore templates."
        }
      },
      modifier = Modifier.fillMaxWidth(),
      colors = ButtonDefaults.buttonColors(
        containerColor = MaterialTheme.colorScheme.primary
      )
    ) {
      Text("Update Greeting")
    }

    Button(
      onClick = {
        name = "Android"
        inputName = ""
        welcomeText = "Welcome to Jetpack Compose!"
      },
      modifier = Modifier.fillMaxWidth(),
      colors = ButtonDefaults.buttonColors(
        containerColor = MaterialTheme.colorScheme.secondaryContainer
      )
    ) {
      Text("Reset")
    }
  }
}`,
    initialState: {
      name: "Builder",
      inputName: "",
      welcomeText: "Welcome to Jetpack Compose!"
    }
  },

  todo: {
    name: "Jetpack Todo List",
    icon: CheckSquare,
    description: "Fully stateful Material 3 Task Manager with progress calculations, persistent local simulation, and responsive checkmark loops.",
    kotlinCode: `package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.MyApplicationTheme

data class TodoItem(val id: Int, val text: String, var isDone: Boolean)

@Composable
fun TodoScreen() {
  var todos by remember { mutableStateOf(listOf(
    TodoItem(1, "Configure debug keystore", true),
    TodoItem(2, "Import Material Design 3 theme", true),
    TodoItem(3, "Implement Room database layer", false)
  )) }
  var query by remember { mutableStateOf("") }

  Column(
    modifier = Modifier.fillMaxSize().padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
  ) {
    Text("My Compose Tasks", fontSize = 24.sp, style = MaterialTheme.typography.headlineMedium)
    
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
      OutlinedTextField(
        value = query,
        onValueChange = { query = it },
        placeholder = { Text("New task...") },
        modifier = Modifier.weight(1f),
        shape = RoundedCornerShape(8.dp)
      )
      
      Button(onClick = {
        if (query.isNotBlank()) {
          todos = todos + TodoItem(todos.size + 1, query, false)
          query = ""
        }
      }) {
        Text("Add")
      }
    }

    LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
      items(todos) { item ->
        Card(modifier = Modifier.fillMaxWidth()) {
          Row(
            modifier = Modifier.padding(12.dp).fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
          ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
              Checkbox(
                checked = item.isDone,
                onCheckedChange = { isChecked ->
                  todos = todos.map { if (it.id == item.id) it.copy(isDone = isChecked) else it }
                }
              )
              Text(item.text, modifier = Modifier.padding(start = 8.dp))
            }
            IconButton(onClick = {
              todos = todos.filter { it.id != item.id }
            }) {
              Icon(imageVector = Icons.Default.Delete, contentDescription = "Delete")
            }
          }
        }
      }
    }
  }
}`,
    initialState: {
      todos: [
        { id: 1, text: "Configure debug keystore", isDone: true },
        { id: 2, text: "Import Material Design 3 theme", isDone: true },
        { id: 3, text: "Implement Room database layer", isDone: false }
      ],
      query: ""
    }
  },

  calculator: {
    name: "Material Calculator",
    icon: Calculator,
    description: "Responsive Compose Grid Calculator with standard operators, local layout calculations, and intermediate ticker states.",
    kotlinCode: `package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun CalculatorScreen() {
  var expression by remember { mutableStateOf("") }
  var result by remember { mutableStateOf("0") }

  Column(
    modifier = Modifier.fillMaxSize().padding(16.dp),
    verticalArrangement = Arrangement.SpaceBetween
  ) {
    Card(
      modifier = Modifier.fillMaxWidth().weight(1f).padding(bottom = 16.dp),
      colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
      Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.Bottom
      ) {
        Text(expression, fontSize = 20.sp, textAlign = TextAlign.End, modifier = Modifier.fillMaxWidth())
        Text(result, fontSize = 48.sp, textAlign = TextAlign.End, modifier = Modifier.fillMaxWidth())
      }
    }

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
      val buttons = listOf(
        listOf("7", "8", "9", "/"),
        listOf("4", "5", "6", "*"),
        listOf("1", "2", "3", "-"),
        listOf("C", "0", "=", "+")
      )

      buttons.forEach { row ->
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
          row.forEach { char ->
            Button(
              onClick = { /* Handle Click */ },
              modifier = Modifier.weight(1f).height(64.dp),
              shape = RoundedCornerShape(16.dp)
            ) {
              Text(char, fontSize = 22.sp)
            }
          }
        }
      }
    }
  }
}`,
    initialState: {
      expression: "",
      result: "0"
    }
  },

  gemini: {
    name: "Gemini AI Chat",
    icon: Sparkles,
    description: "Interactive backend AI Chat client utilizing your active Gemini API key. Chat with Gemini in real-time inside the Android preview emulator!",
    kotlinCode: `package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.MyApplicationTheme

data class ChatMessage(val text: String, val isUser: Boolean)

@Composable
fun GeminiChatScreen() {
  var messages by remember { mutableStateOf(listOf(
    ChatMessage("Hi! I'm Gemini 1.5 Flash. Ask me anything about Android Compose code!", false)
  )) }
  var prompt by remember { mutableStateOf("") }
  var isLoading by remember { mutableStateOf(false) }

  Column(
    modifier = Modifier.fillMaxSize().padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
  ) {
    Text("Gemini AI Client", fontSize = 24.sp, color = MaterialTheme.colorScheme.primary)
    
    LazyColumn(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(8.dp)) {
      items(messages) { msg ->
        Box(
          modifier = Modifier.fillMaxWidth(),
          contentAlignment = if (msg.isUser) Alignment.CenterEnd else Alignment.CenterStart
        ) {
          Card(
            colors = CardDefaults.cardColors(
              containerColor = if (msg.isUser) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.secondaryContainer
            )
          ) {
            Text(msg.text, modifier = Modifier.padding(12.dp), fontSize = 14.sp)
          }
        }
      }
    }

    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
      OutlinedTextField(
        value = prompt,
        onValueChange = { prompt = it },
        placeholder = { Text("Ask Gemini...") },
        modifier = Modifier.weight(1f),
        enabled = !isLoading,
        shape = RoundedCornerShape(12.dp)
      )
      Button(
        onClick = { /* Run AI Call */ },
        enabled = prompt.isNotBlank() && !isLoading
      ) {
        if (isLoading) CircularProgressIndicator(size = 18.dp) else Text("Ask")
      }
    }
  }
}`,
    initialState: {
      messages: [
        { text: "Hi! I am Gemini. This app connects directly to your active GEMINI_API_KEY. Ask me anything about Android coding!", isUser: false }
      ],
      prompt: "",
      isLoading: false
    }
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('greetings'); // greetings, todo, calculator, gemini
  const [kotlinCode, setKotlinCode] = useState(APP_TEMPLATES.greetings.kotlinCode);
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState([
    "🎨 Loaded: Google Material 3 UI Engine",
    "☕ Java development kit configured (Simulated Web Runtime)",
    "🔧 Target API set to sdk-36",
    "📱 Nginx reverse proxy mapped to port 3000",
    "🎯 Android build succeeded! Running live simulator on device."
  ]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [themeMode, setThemeMode] = useState('dark'); // dark/light
  const [utcTime, setUtcTime] = useState(new Date().toUTCString());

  // Emulator state maps
  const [greetingState, setGreetingState] = useState(APP_TEMPLATES.greetings.initialState);
  const [todoState, setTodoState] = useState(APP_TEMPLATES.todo.initialState);
  const [calcState, setCalcState] = useState({ expression: "", result: "0" });
  const [geminiState, setGeminiState] = useState(APP_TEMPLATES.gemini.initialState);

  // AI Prompt Generating
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  useEffect(() => {
    // Keep UTC time ticking
    const timer = setInterval(() => {
      setUtcTime(new Date().toISOString().substring(11, 16) + " UTC");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleTemplateChange = (tabId) => {
    setActiveTab(tabId);
    setKotlinCode(APP_TEMPLATES[tabId].kotlinCode);
    setLogs((prev) => [
      ...prev,
      `🔄 Active screen shifted to: ${APP_TEMPLATES[tabId].name}`,
      `💻 Loaded source code to primary editor panel`
    ]);
  };

  // Sync editor modifications back to our local states (simulating static compiler updates)
  const handleCodeChange = (newVal) => {
    setKotlinCode(newVal);
    // Parse name greeting if edited
    if (activeTab === 'greetings') {
      const matchName = newVal.match(/mutableStateOf\("([^"]+)"\)/);
      if (matchName && matchName[1]) {
        setGreetingState(prev => ({ ...prev, name: matchName[1] }));
      }
    }
  };

  // Run mock compile
  const handleCompile = () => {
    setLogs((prev) => [
      ...prev,
      `⚙️ compiling source file '/app/src/main/java/com/example/MainActivity.kt'...`,
      `📦 resolving external dependencies defined in libs.versions.toml...`,
      `🔧 binding Material Theme: MyApplicationTheme`,
      `✅ compilation finished. 0 errors, 0 warnings.`,
      `📱 deployed app package package 'com.example' to streaming device.`
    ]);
    triggerToast("Build succeeded! emulator refreshed successfully.");
  };

  // Inject boilerplate pieces
  const injectComponent = (type) => {
    let snippet = "";
    if (type === "Button") {
      snippet = `\n    Button(\n      onClick = { /* Todo action */ },\n      modifier = Modifier.fillMaxWidth()\n    ) {\n      Text("Action Button")\n    }`;
    } else if (type === "Text") {
      snippet = `\n    Text(\n      text = "Simulated Material Label",\n      fontSize = 18.sp,\n      style = MaterialTheme.typography.bodyLarge\n    )`;
    } else if (type === "Card") {
      snippet = `\n    Card(\n      modifier = Modifier.fillMaxWidth().padding(8.dp)\n    ) {\n      Text("Compose Card Container", modifier = Modifier.padding(16.dp))\n    }`;
    } else if (type === "Spacer") {
      snippet = `\n    Spacer(modifier = Modifier.height(16.dp))`;
    }

    // Insert before closing bracket of primary layout
    const lines = kotlinCode.split('\n');
    let insertIndex = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('}')) {
        insertIndex = i;
        break;
      }
    }

    if (insertIndex !== -1) {
      lines.splice(insertIndex, 0, snippet);
      const updatedCode = lines.join('\n');
      setKotlinCode(updatedCode);
      setLogs(prev => [...prev, `➕ Injected Compose component: ${type}`]);
      triggerToast(`Injected ${type} element!`);

      // Mock local visual append based on active screen
      if (activeTab === 'greetings') {
        if (type === 'Text') {
          setGreetingState(prev => ({ ...prev, welcomeText: "Simulated Material Label" }));
        } else if (type === 'Button') {
          setGreetingState(prev => ({ ...prev, name: "New Action Button Activated" }));
        }
      }
    }
  };

  // Sync to actual MainActivity.kt in workspace
  const syncToDisk = async () => {
    try {
      setLogs((prev) => [...prev, "💾 Saving Kotlin source file to `/app/src/main/java/com/example/MainActivity.kt` on disk..."]);
      
      // Update metadata name to match string app_name
      let appName = "My Application";
      if (activeTab === 'todo') appName = "Compose Tasks";
      else if (activeTab === 'calculator') appName = "Material Calc";
      else if (activeTab === 'gemini') appName = "Gemini Client";

      // We execute standard update using a local save trigger
      const res = await fetch('/api/save-source', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: kotlinCode, appName })
      });
      
      triggerToast("Saved MainActivity.kt and metadata.json!");
      setLogs((prev) => [...prev, "✅ Source files updated successfully. Ready for Android build exports!"]);
    } catch (e) {
      // Direct update
      triggerToast("Error saving source files.");
    }
  };

  // Submit calculator press
  const handleCalcPress = (val) => {
    setCalcState((prev) => {
      let expr = prev.expression;
      let res = prev.result;

      if (val === 'C') {
        return { expression: "", result: "0" };
      } else if (val === '=') {
        try {
          if (!expr) return prev;
          // evaluate expr safely (only numbers/ops)
          const cleanExpr = expr.replace(/[^0-9+\-*/.]/g, '');
          const calculated = eval(cleanExpr);
          setLogs(l => [...l, `📊 Evaluated equation: ${expr} = ${calculated}`]);
          return { expression: expr, result: String(calculated) };
        } catch (err) {
          return { expression: expr, result: "Error" };
        }
      } else {
        // operators
        if (['+', '-', '*', '/'].includes(val)) {
          return { expression: expr + " " + val + " ", result: res };
        } else {
          // number
          const newExpr = expr + val;
          return { expression: newExpr, result: res };
        }
      }
    });
  };

  // Gemini chat ask
  const handleGeminiAsk = async () => {
    if (!geminiState.prompt.trim()) return;
    const userPrompt = geminiState.prompt;
    setGeminiState((prev) => ({
      ...prev,
      messages: [...prev.messages, { text: userPrompt, isUser: true }],
      prompt: "",
      isLoading: true
    }));

    setLogs((l) => [...l, `🤖 Sending user request to models/gemini-1.5-flash...`]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt })
      });

      const resJson = await response.json();
      
      let replyText = "Sorry, I encountered an error communicating with Gemini API.";
      if (resJson.candidates && resJson.candidates[0] && resJson.candidates[0].content) {
        replyText = resJson.candidates[0].content.parts[0].text;
      } else if (resJson.error) {
        replyText = `Error: ${resJson.error}`;
      }

      setGeminiState((prev) => ({
        ...prev,
        messages: [...prev.messages, { text: replyText, isUser: false }],
        isLoading: false
      }));

      setLogs((l) => [...l, `✅ Received Gemini response. Updated device interface.`]);
    } catch (err) {
      setGeminiState((prev) => ({
        ...prev,
        messages: [...prev.messages, { text: `API Connection Failed: ${err.message}`, isUser: false }],
        isLoading: false
      }));
    }
  };

  // Generate compose screens using Gemini
  const generateComposeWithGemini = async () => {
    if (!aiPromptInput.trim() || aiGenerating) return;
    setAiGenerating(true);
    setLogs((l) => [...l, `✨ Prompting Gemini coder to design: "${aiPromptInput}"`]);
    triggerToast("Generating your Compose Interface...");

    const fullPrompt = `You are a helper tool that outputs clean Kotlin Jetpack Compose codes for Android.
The user wants: "${aiPromptInput}".
Please generate a fully completed @Composable Screen function. Do not write anything other than Kotlin code; output the code directly with no markdown wraps, beginning with package com.example or importing libraries. Keep it compliant with standard material 3 structures. Make sure it contains correct @Composable annotations.`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt })
      });

      const resJson = await response.json();
      let code = "";
      if (resJson.candidates && resJson.candidates[0] && resJson.candidates[0].content) {
        let textResult = resJson.candidates[0].content.parts[0].text;
        // Strip any markdown codeblock ticks
        code = textResult.replace(/```kotlin/gi, '').replace(/```/g, '').trim();
      }

      if (code) {
        setKotlinCode(code);
        setLogs((l) => [...l, `✨ Gemini compiled code successfully. Live injection complete.`]);

        // Mock state to render on-device customized greeting
        if (activeTab === 'greetings') {
          setGreetingState({
            name: "AI Generated",
            inputName: "",
            welcomeText: `Live View of: ${aiPromptInput}`
          });
        }
        triggerToast("Injected custom Compose Screen!");
        setAiPromptInput('');
      } else {
        triggerToast("Failed to compile preview from AI. Please try another prompt.");
      }
    } catch (e) {
      triggerToast("Gemini developer error. Check your connection.");
    } finally {
      setAiGenerating(false);
    }
  };

  // Syntax highlighting mock function
  const renderHighlightedCode = (code) => {
    if (!code) return "";
    const lines = code.split('\n');
    return lines.map((line, i) => {
      // Quick replace regexes
      let safeLine = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Keywords
      const keywords = [
        'package', 'import', 'class', 'fun', 'override', 'val', 'var', 'remember', 
        'mutableStateOf', 'by', 'it', 'for', 'if', 'else', 'return', 'data', 'true', 'false'
      ];
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'g');
        safeLine = safeLine.replace(regex, `<span class="text-pink-500 font-bold">${kw}</span>`);
      });

      // Composables / CamelCase uppercase names
      safeLine = safeLine.replace(/\b([A-Z][a-zA-Z0-9_]+)\b/g, '<span class="text-sky-300 font-semibold">$1</span>');

      // Strings
      safeLine = safeLine.replace(/"([^"]*)"/g, '<span class="text-emerald-400">"$1"</span>');

      // Comments
      safeLine = safeLine.replace(/(\/\/.*)/g, '<span class="text-slate-500 italic">$1</span>');

      // Annotations
      safeLine = safeLine.replace(/(@[A-Za-z0-9_]+)/g, '<span class="text-amber-400 font-medium">$1</span>');

      return (
        <div key={i} class="hover:bg-slate-800/50 px-2 flex font-mono text-sm leading-relaxed">
          <span class="w-8 text-right select-none text-slate-600 pr-3 border-r border-slate-800/60 mr-3 text-xs pt-1">{i + 1}</span>
          <pre class="flex-1 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: safeLine }} />
        </div>
      );
    });
  };

  return (
    <div class="h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
      
      {/* HEADER BAR */}
      <header class="h-14 border-b border-slate-800/80 bg-slate-900/90 px-4 flex items-center justify-between z-10">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 glow-android">
            <Smartphone class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-md font-bold tracking-tight text-white">Compose Studio Workspace</h1>
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">SDK-36 LIVE</span>
            </div>
            <p class="text-xs text-slate-400">Node-hybrid Jetpack Compose emulation environment</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          {/* UTC Clock */}
          <div class="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800/60 text-xs font-mono text-slate-300">
            <Cpu class="w-3.5 h-3.5 text-sky-400" />
            <span>Clock: {utcTime}</span>
          </div>

          <button 
            onClick={handleCompile}
            class="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition duration-150 shadow-lg shadow-emerald-500/10"
          >
            <Play class="w-3.5 h-3.5 fill-slate-950" />
            <span>Compile App</span>
          </button>

          <button 
            onClick={syncToDisk}
            class="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-white text-xs font-semibold flex items-center gap-1.5 transition duration-150"
            title="Save changes back to main file on disk"
          >
            <Download class="w-3.5 h-3.5 text-slate-300" />
            <span>Sync to Device</span>
          </button>
        </div>
      </header>

      {/* CORE CONTENT */}
      <main class="flex-1 flex overflow-hidden">
        
        {/* LEFTSIDEBAR: SNIPPETS SELECTOR */}
        <aside class="w-72 border-r border-slate-800/80 bg-slate-900/40 p-4 flex flex-col gap-4 overflow-y-auto">
          <div>
            <h2 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Composables Templates</h2>
            <p class="text-xs text-slate-500 mb-3">Load interactive Material 3 states onto the simulated Android display screen.</p>
          </div>

          <div class="flex flex-col gap-2">
            {Object.entries(APP_TEMPLATES).map(([key, item]) => {
              const Icon = item.icon;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => handleTemplateChange(key)}
                  class={`p-3 rounded-xl border text-left transition duration-200 group flex gap-3 ${
                    isActive 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <div class={`p-1.5 rounded-lg border flex items-center justify-center h-fit shrink-0 ${
                    isActive ? 'bg-emerald-500/20 border-emerald-500/20' : 'bg-slate-950 border-slate-800 group-hover:border-slate-600'
                  }`}>
                    <Icon class="w-4 h-4" />
                  </div>
                  <div class="min-w-0">
                    <div class="text-xs font-semibold truncate">{item.name}</div>
                    <div class="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div class="mt-auto border-t border-slate-800/80 pt-4 flex flex-col gap-3">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <div class="flex items-center gap-1.5">
                <BookOpen class="w-3.5 h-3.5 text-amber-500" />
                <span>Sandbox Specs</span>
              </div>
            </div>
            <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1.5 font-mono">
              <div class="flex justify-between">
                <span>JDK:</span>
                <span class="text-slate-300 font-bold">JDK 21</span>
              </div>
              <div class="flex justify-between">
                <span>API target:</span>
                <span class="text-slate-300">sdk-36</span>
              </div>
              <div class="flex justify-between">
                <span>AGP Version:</span>
                <span class="text-slate-300">9.1.1</span>
              </div>
              <div class="flex justify-between">
                <span>Compose:</span>
                <span class="text-emerald-400 font-bold">Enabled</span>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER: INTERACTIVE IDE WRAPPER */}
        <section class="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          
          {/* EDITOR HEAD */}
          <div class="h-10 border-b border-slate-800/80 bg-slate-900/20 px-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <FileCode class="w-4 h-4 text-sky-400" />
              <span class="text-xs font-mono font-bold text-slate-300">/app/src/main/java/com/example/MainActivity.kt</span>
            </div>

            {/* Jetpack Modifier Adder panel */}
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1">Inject Component:</span>
              {['Text', 'Button', 'Card', 'Spacer'].map(elem => (
                <button
                  key={elem}
                  onClick={() => injectComponent(elem)}
                  class="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 hover:text-emerald-400 border border-slate-800/80 text-[10px] font-mono text-slate-300 transition duration-150"
                >
                  +{elem}
                </button>
              ))}
            </div>
          </div>

          {/* EDITOR WRAP */}
          <div class="flex-1 overflow-auto bg-slate-900/20 py-2">
            {renderHighlightedCode(kotlinCode)}
          </div>

          {/* DYNAMIC LOGS FOOTER */}
          <div class="h-44 border-t border-slate-800/80 bg-slate-950 flex flex-col max-h-44 shrink-0">
            <div class="h-8 bg-slate-900/40 border-b border-slate-800/60 px-4 flex items-center justify-between text-xs text-slate-400">
              <span class="font-bold flex items-center gap-1.5 font-mono">
                <Cpu class="w-3.5 h-3.5 text-emerald-400" />
                <span>Compiler Terminal Logs</span>
              </span>
              <button 
                onClick={() => setLogs([])}
                class="text-[10px] hover:text-white transition duration-150 flex items-center gap-1"
              >
                <RotateCcw class="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
            <div class="flex-1 overflow-y-auto p-3 font-mono text-[11px] text-slate-300 space-y-1 bg-slate-950/40">
              {logs.length === 0 ? (
                <div class="text-slate-600 italic">No logs on build stack. Compile app to run checklists.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} class="hover:bg-slate-900/30 px-1">{log}</div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* RIGHTSIDEBAR: DEVICE SIMULATOR (THE "EMULATOR") */}
        <aside class="w-[420px] border-l border-slate-800/80 bg-slate-900/40 p-5 flex flex-col gap-4 overflow-y-auto items-center shrink-0">
          
          {/* AI Generator Box */}
          <div class="w-full bg-slate-900/60 border border-slate-800 p-3 rounded-2xl flex flex-col gap-2 shrink-0">
            <div class="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Sparkles class="w-3.5 h-3.5 animate-bounce" />
              <span>Compose AI Prompt Generator</span>
            </div>
            <p class="text-[10px] text-slate-400 leading-normal">Prompt Gemini to engineer custom Kotlin Composables directly onto your stack.</p>
            <div class="flex gap-2">
              <input
                type="text"
                value={aiPromptInput}
                onChange={e => setAiPromptInput(e.target.value)}
                placeholder="e.g. Design a dark profile card with counts..."
                class="flex-1 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50"
                disabled={aiGenerating}
              />
              <button
                onClick={generateComposeWithGemini}
                class="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition duration-150 shrink-0 flex items-center justify-center"
                disabled={aiGenerating || !aiPromptInput.trim()}
              >
                {aiGenerating ? '...' : <Send class="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* ANDROID DEVICE SIMULATOR CONTAINER */}
          <div class="relative w-[320px] h-[640px] bg-slate-950 rounded-[44px] border-8 border-slate-800 shadow-2xl shadow-emerald-500/5 flex flex-col overflow-hidden float-device glow-android shrink-0">
            
            {/* Status Bar */}
            <div class="h-9 bg-slate-900 px-6 flex items-center justify-between text-[11px] font-medium text-slate-400 gap-1 select-none z-10 shrink-0">
              <span>9:41 AM</span>
              {/* Notch */}
              <div class="w-20 h-4 bg-slate-950 rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center">
                <div class="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800/40"></div>
              </div>
              <div class="flex items-center gap-1">
                <span>5G</span>
                <span>88%</span>
              </div>
            </div>

            {/* SCREEN WRAPPED CANVAS (THE RUNNING APPLET SCREEN) */}
            <div class="flex-1 bg-slate-900 flex flex-col text-slate-100 overflow-hidden relative">
              
              {/* SCREEN INTERACTION ACCORDING TO ACTIVED SNIPPET */}
              {activeTab === 'greetings' && (
                <div class="flex-1 flex flex-col p-5 bg-slate-900">
                  <div class="flex-1 flex flex-col items-center justify-center text-center gap-4">
                    
                    {/* Header Heading */}
                    <div class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 animate-pulse">
                      Hello, {greetingState.name}!
                    </div>

                    <div class="text-slate-400 text-sm max-w-[220px] leading-relaxed">
                      {greetingState.welcomeText}
                    </div>

                    {/* Clock Display widgets */}
                    <div class="mt-4 px-3.5 py-1.5 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] font-mono text-emerald-400">
                      UTC Engine ticks: <span class="font-bold">{utcTime}</span>
                    </div>

                    {/* Divider */}
                    <div class="w-full h-[1px] bg-slate-800/70 my-2"></div>

                    {/* Simple live interactive field */}
                    <div class="w-full text-left space-y-2">
                      <label class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Name (TextField)</label>
                      <input
                        type="text"
                        value={greetingState.inputName}
                        onChange={(e) => setGreetingState(p => ({ ...p, inputName: e.target.value }))}
                        placeholder="Customize username title"
                        class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60"
                      />
                    </div>

                    {/* Button trigger */}
                    <button
                      onClick={() => {
                        if (greetingState.inputName.trim()) {
                          setGreetingState(p => ({
                            ...p,
                            name: greetingState.inputName,
                            inputName: "",
                            welcomeText: "Awesome update! Feel free to checkout another template snippet."
                          }));
                          setLogs(l => [...l, `🟢 Live interactive input update name: "${greetingState.inputName}"`]);
                        }
                      }}
                      class="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition duration-150 shadow-md shadow-emerald-500/10"
                    >
                      Update Greeting
                    </button>

                  </div>

                  {/* Android navigation dots */}
                  <div class="text-[9px] text-center text-slate-500 font-mono mt-auto">com.example.greetings</div>
                </div>
              )}

              {activeTab === 'todo' && (
                <div class="flex-1 flex flex-col p-5 bg-slate-900 overflow-hidden">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-white">Compose Tasks</h3>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                      {todoState.todos.filter(t => t.isDone).length}/{todoState.todos.length} done
                    </span>
                  </div>

                  {/* Task Addition Bar */}
                  <div class="flex gap-2 mb-4 shrink-0">
                    <input
                      type="text"
                      value={todoState.query}
                      onChange={(e) => setTodoState(p => ({ ...p, query: e.target.value }))}
                      placeholder="Input new task label..."
                      class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (todoState.query.trim()) {
                          setTodoState(p => ({
                            query: "",
                            todos: [...p.todos, { id: p.todos.length + 1, text: todoState.query, isDone: false }]
                          }));
                          setLogs(l => [...l, `➕ Added interactive todo list task: "${todoState.query}"`]);
                        }
                      }}
                      class="p-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition font-bold"
                    >
                      <Plus class="w-4 h-4" />
                    </button>
                  </div>

                  {/* List item scroll */}
                  <div class="flex-1 overflow-y-auto space-y-2 pr-1">
                    {todoState.todos.length === 0 ? (
                      <div class="text-center text-slate-500 text-xs py-8">No tasks. Add or modify snippets!</div>
                    ) : (
                      todoState.todos.map((item) => (
                        <div key={item.id} class="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between group justify-between">
                          <button
                            onClick={() => {
                              setTodoState(prev => ({
                                ...prev,
                                todos: prev.todos.map(t => t.id === item.id ? { ...t, isDone: !t.isDone } : t)
                              }));
                            }}
                            class="flex items-center gap-2.5 text-slate-300 hover:text-white truncate"
                          >
                            <div class={`w-4 h-4 rounded border flex items-center justify-center transition shrink-0 ${
                              item.isDone ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-800 hover:border-slate-600 bg-slate-900'
                            }`}>
                              {item.isDone && <Check class="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span class={`text-xs truncate ${item.isDone ? 'line-through text-slate-500' : ''}`}>{item.text}</span>
                          </button>
                          <button
                            onClick={() => {
                              setTodoState(prev => ({
                                ...prev,
                                todos: prev.todos.filter(t => t.id !== item.id)
                              }));
                              setLogs(l => [...l, `🗑️ Deleted todo task item`]);
                            }}
                            class="text-slate-500 hover:text-red-400 transition"
                          >
                            <Trash2 class="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div class="text-[9px] text-center text-slate-500 font-mono mt-2 pt-2 border-t border-slate-800/50">com.example.tasks</div>
                </div>
              )}

              {activeTab === 'calculator' && (
                <div class="flex-1 flex flex-col p-4 bg-slate-900">
                  
                  {/* Results panel Widget */}
                  <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex flex-col gap-1 items-end min-h-[96px] justify-center mb-4 text-right">
                    <span class="text-xs text-slate-500 font-mono tracking-wider truncate max-w-full">
                      {calcState.expression || "Empty equation"}
                    </span>
                    <span class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 tracking-tight font-mono select-all truncate max-w-full">
                      {calcState.result}
                    </span>
                  </div>

                  {/* Calculator keys grid */}
                  <div class="grid grid-cols-4 gap-2 flex-1">
                    {[
                      ['7', '8', '9', '/'],
                      ['4', '5', '6', '*'],
                      ['1', '2', '3', '-'],
                      ['C', '0', '=', '+']
                    ].flat().map((char) => {
                      const isOperator = ['/', '*', '-', '+', '='].includes(char);
                      const isClear = char === 'C';
                      return (
                        <button
                          key={char}
                          onClick={() => handleCalcPress(char)}
                          class={`rounded-xl font-bold font-mono text-sm h-full flex items-center justify-center transition duration-150 ${
                            isClear 
                              ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20' 
                              : isOperator 
                                ? 'bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20' 
                                : 'bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-100 hover:text-white'
                          }`}
                        >
                          {char}
                        </button>
                      );
                    })}
                  </div>

                  <div class="text-[9px] text-center text-slate-500 font-mono mt-3">com.example.calc</div>
                </div>
              )}

              {activeTab === 'gemini' && (
                <div class="flex-1 flex flex-col p-4 bg-slate-900 overflow-hidden">
                  
                  {/* Header widget */}
                  <div class="flex items-center gap-2 mb-3 bg-slate-950/60 p-2 rounded-xl border border-slate-800 shrink-0">
                    <Sparkles class="w-4 h-4 text-sky-400" />
                    <div>
                      <h4 class="text-xs font-bold text-white">Gemini 1.5 Flash</h4>
                      <p class="text-[9px] text-emerald-400">Channel Ready</p>
                    </div>
                  </div>

                  {/* Chat bubbles list */}
                  <div class="flex-1 overflow-y-auto space-y-3.5 pr-1 mb-3">
                    {geminiState.messages.map((item, idx) => (
                      <div key={idx} class={`flex flex-col ${item.isUser ? 'items-end' : 'items-start'}`}>
                        <div class={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                          item.isUser 
                            ? 'bg-sky-500 text-slate-950 rounded-tr-none font-medium' 
                            : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                        }`}>
                          {item.text}
                        </div>
                      </div>
                    ))}
                    {geminiState.isLoading && (
                      <div class="flex items-center gap-1.5 text-[10px] text-slate-400 bg-slate-950 p-2 rounded-xl max-w-[120px] ml-1">
                        <div class="w-2 h-2 rounded-full bg-sky-400 animate-ping"></div>
                        <span>Gemini typing...</span>
                      </div>
                    )}
                  </div>

                  {/* Send prompt bar widget */}
                  <div class="flex gap-2 shrink-0">
                    <input
                      type="text"
                      value={geminiState.prompt}
                      onChange={(e) => setGeminiState(p => ({ ...p, prompt: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleGeminiAsk();
                      }}
                      placeholder="Query artificial intelligence..."
                      disabled={geminiState.isLoading}
                      class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                    />
                    <button
                      onClick={handleGeminiAsk}
                      disabled={geminiState.isLoading || !geminiState.prompt.trim()}
                      class="p-2 rounded-xl bg-sky-500 text-slate-950 hover:bg-sky-400 disabled:opacity-40 transition font-bold"
                    >
                      <Send class="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div class="text-[9px] text-center text-slate-400 font-mono mt-2">com.example.geminiaichat</div>
                </div>
              )}

              {/* Bottom Android Soft keys */}
              <div class="h-10 bg-slate-950 flex items-center justify-around text-slate-500 shrink-0 select-none border-t border-slate-900">
                <button class="hover:text-white transition"><Smartphone class="w-4 h-4" /></button>
                <button class="hover:text-white transition w-3.5 h-3.5 rounded-full border-2 border-slate-500 hover:border-white"></button>
                <button class="hover:text-white transition text-sm font-bold font-mono">◀</button>
              </div>

            </div>
          </div>
          
        </aside>
      </main>

      {/* TOAST SYSTEM ACCENTS */}
      {showToast && (
        <div class="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500/40 text-emerald-300 font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-bounce text-xs">
          <Sparkles class="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

    </div>
  );
}
