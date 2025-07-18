import discord
import json
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

def load_stats():
    try:
        with open("stats.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_stats(stats):
    with open("stats.json", "w") as f:
        json.dump(stats, f, indent=2)

@bot.command()
async def addkill(ctx, username):
    stats = load_stats()
    if username not in stats:
        stats[username] = {"kills": 0, "deaths": 0, "playtime": 0}
    stats[username]["kills"] += 1
    save_stats(stats)
    await ctx.send(f"Kill added to {username}.")

@bot.command()
async def adddeath(ctx, username):
    stats = load_stats()
    if username not in stats:
        stats[username] = {"kills": 0, "deaths": 0, "playtime": 0}
    stats[username]["deaths"] += 1
    save_stats(stats)
    await ctx.send(f"Death added to {username}.")

@bot.command()
async def addplaytime(ctx, username, hours: int, minutes: int):
    stats = load_stats()
    if username not in stats:
        stats[username] = {"kills": 0, "deaths": 0, "playtime": 0}
    stats[username]["playtime"] += hours * 60 + minutes
    save_stats(stats)
    await ctx.send(f"Added {hours} hr {minutes} min to {username}.")

bot.run("YOUR_BOT_TOKEN")
