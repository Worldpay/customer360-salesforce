#!/usr/bin/env python3
"""Thin wrapper — unified prototype is built by build360HtmlPrototype.py."""

import build360HtmlPrototype as unified

if __name__ == "__main__":
    unified.assemble(
        unified.OUT_HUB,
        "Customer 360 — Accounts Hub prototype",
        "Customer 360 Accounts Hub — double-click to open · illustrative data only · no Salesforce required",
    )
