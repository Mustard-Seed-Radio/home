#!/bin/bash

echo "🎧 Setting up Mixxx broadcast environment..."

# -------------------------------
# Create virtual sink if missing
# -------------------------------
if ! pactl list short sinks | grep -q MixxxSink; then
    echo "🔧 Creating MixxxSink..."
    pactl load-module module-null-sink sink_name=MixxxSink sink_properties=device.description=MixxxSink
else
    echo "✅ MixxxSink already exists"
fi

sleep 1

# -------------------------------
# Set default output (music → MixxxSink)
# -------------------------------
echo "🔊 Setting default sink to MixxxSink..."
pactl set-default-sink MixxxSink

# -------------------------------
# Detect Zoom PodTrak P4 mic
# -------------------------------
echo "🎤 Detecting Zoom PodTrak P4..."

P4_SOURCE=$(pactl list short sources | grep -i "zoom" | awk '{print $2}' | head -n 1)

if [ ! -z "$P4_SOURCE" ]; then
    echo "✅ Found P4 mic: $P4_SOURCE"
    
    echo "🎤 Setting as default input..."
    pactl set-default-source "$P4_SOURCE"

    # Boost mic volume (optional tweak)
    pactl set-source-volume "$P4_SOURCE" 100%

else
    echo "⚠️ Zoom PodTrak P4 not found!"
    echo "👉 Make sure it's plugged in and powered on"
fi

# -------------------------------
# Small delay for stability
# -------------------------------
sleep 1

# -------------------------------
# Launch Mixxx
# -------------------------------
echo "🚀 Launching Mixxx..."
mixxx &

# -------------------------------
# Instructions
# -------------------------------
echo ""
echo "✅ Setup complete!"
echo ""
echo "👉 In pavucontrol:"
echo "   - Playback tab: apps → MixxxSink"
echo "   - Recording tab: Mixxx → Monitor of MixxxSink"
echo ""
echo "👉 In Mixxx:"
echo "   - Mic input → Zoom PodTrak P4"
echo "   - Enable Mic/Aux in UI"