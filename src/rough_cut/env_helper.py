"""
Environment and DLL helper for Windows CUDA / CTranslate2.
Ensures cuBLAS and related NVIDIA DLLs are properly registered before importing faster_whisper.
"""

import os
import sys

def setup_cuda_env():
    """Register NVIDIA cuBLAS directory if present on Windows Python 3.13."""
    if sys.platform != "win32":
        return

    candidate_paths = [
        os.path.expanduser(r"~\AppData\Roaming\Python\Python313\site-packages\nvidia\cublas\bin"),
        os.path.expanduser(r"~\AppData\Local\Programs\Python\Python313\Lib\site-packages\nvidia\cublas\bin"),
        r"C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.0\bin",
        r"C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.4\bin",
    ]

    for p in candidate_paths:
        if os.path.exists(p):
            if hasattr(os, "add_dll_directory"):
                try:
                    os.add_dll_directory(p)
                except Exception:
                    pass
            if p not in os.environ.get("PATH", ""):
                os.environ["PATH"] = p + os.pathsep + os.environ.get("PATH", "")
            break
