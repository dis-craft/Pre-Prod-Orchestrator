"""
Platform Module for Person 4.
Provides platform API, finding read models, workflow status, and integration adapters.
"""
import sys
import importlib.util

# Forward stdlib 'platform' module functions so third-party packages (e.g. zstandard, httpx)
# continue to work when root workspace directory 'platform' is in sys.path.
for _p in sys.path:
    if "Lib" in _p and "site-packages" not in _p:
        try:
            _spec = importlib.util.spec_from_file_location("_stdlib_platform_mod", f"{_p}/platform.py")
            if _spec and _spec.loader:
                _m = importlib.util.module_from_spec(_spec)
                _spec.loader.exec_module(_m)
                for _attr in dir(_m):
                    if not _attr.startswith("__") and _attr not in globals():
                        globals()[_attr] = getattr(_m, _attr)
                break
        except Exception:
            pass

__version__ = "0.1.0"
