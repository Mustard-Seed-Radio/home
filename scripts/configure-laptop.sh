#!/usr/bin/env bash

set -e

echo "Stopping PulseAudio if present..."
systemctl --user stop pulseaudio.socket pulseaudio.service 2>/dev/null || true

echo "Removing PulseAudio (if installed)..."
sudo apt remove --purge -y pulseaudio pulseaudio-utils pavucontrol 2>/dev/null || true

echo "Cleaning old PulseAudio configs..."
rm -rf ~/.config/pulse ~/.pulse* 2>/dev/null || true

echo "Installing PipeWire..."
sudo apt install -y pipewire pipewire-pulse wireplumber pipewire-audio-client-libraries libspa-0.2-bluetooth

echo "Enabling PipeWire services..."
systemctl --user --now enable pipewire pipewire-pulse wireplumber

echo "Restarting user services..."
systemctl --user restart pipewire pipewire-pulse wireplumber

echo "Checking status..."
systemctl --user --no-pager --full status pipewire || true
systemctl --user --no-pager --full status wireplumber || true

echo "Done. Log out and log back in if needed."