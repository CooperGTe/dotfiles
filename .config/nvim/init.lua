-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
    local lazyrepo = "https://github.com/folke/lazy.nvim.git"
    local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
    if vim.v.shell_error ~= 0 then
	vim.api.nvim_echo({
        { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
        { out, "WarningMsg" },
        { "\nPress any key to exit..." },
        }, true, {})
	vim.fn.getchar()
	os.exit(1)
    end
end
vim.opt.rtp:prepend(lazypath)

vim.opt.termguicolors = true

-- Make sure to setup `mapleader` and `maplocalleader` before
-- loading lazy.nvim so that mappings are correct.
-- This is also a good place to setup other settings (vim.opt)
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1

-- Setup lazy.nvim
require("lazy").setup({
    spec = {
        { "nvim-lualine/lualine.nvim" },
        { "nvim-telescope/telescope.nvim" },
        { "folke/which-key.nvim" },
        { "akinsho/bufferline.nvim" },
        {
            "norcalli/nvim-colorizer.lua",
            event = "BufReadPre",
            config = function()
                require("colorizer").setup()
            end
        },
        { "catppuccin/nvim",
            name = "catppuccin",
            priority = 1000,
            config = function()
                require("catppuccin").setup({
                    flavour = "mocha", -- latte, frappe, macchiato, mocha
                    background = { -- :h background
                        light = "latte",
                        dark = "mocha",
                    },
                    transparent_background = true, -- disables setting the background color.
                    show_end_of_buffer = false, -- shows the '~' characters after the end of buffers
                    term_colors = false, -- sets terminal colors (e.g. `g:terminal_color_0`)
                    dim_inactive = {
                        enabled = false, -- dims the background color of inactive window
                        shade = "dark",
                        percentage = 0.15, -- percentage of the shade to apply to the inactive window
                    },
                    no_italic = false, -- Force no italic
                    no_bold = false, -- Force no bold
                    no_underline = false, -- Force no underline
                    styles = { -- Handles the styles of general hi groups (see `:h highlight-args`):
                        comments = { "italic" }, -- Change the style of comments
                        conditionals = { "italic" },
                        loops = {},
                        functions = {},
                        keywords = {},
                        strings = {},
                        variables = {},
                        numbers = {},
                        booleans = {},
                        properties = {},
                        types = {},
                        operators = {},
                        -- miscs = {}, -- Uncomment to turn off hard-coded styles
                    },
                    color_overrides = {},
                    custom_highlights = {},
                    default_integrations = true,
                    integrations = {
                        cmp = true,
                        gitsigns = true,
                        nvimtree = false,
                        treesitter = true,
                        notify = false,
                        mini = {
                            enabled = true,
                            indentscope_color = "",
                        },
                        -- For more plugins integrations please scroll down (https://github.com/catppuccin/nvim#integrations)
                    },
                })
            end
        },
        {
            "williamboman/mason.nvim",
            dependencies = { "williamboman/mason-lspconfig.nvim" },
            config = function()
                require("mason").setup()
                require("mason-lspconfig").setup({
                    ensure_installed = { "lua_ls", "html", "cssls" }
                })
            end
        },
        {
            'saghen/blink.cmp',
            dependencies = 'rafamadriz/friendly-snippets',

            version = '*',
            opts = {
                keymap = {
                    preset = 'none',

                    ['<Tab>'] = { 'select_next', 'fallback' },
                    ['<S-Tab>'] = { 'select_prev', 'fallback' },

		            ['<C-CR>'] = { 'select_and_accept' },

                },
                appearance = {
                    use_nvim_cmp_as_default = true,
                    nerd_font_variant = 'mono',
                },

                sources = {
                    default = { 'snippets', 'lsp', 'path', 'buffer' },
                },
            },
            opts_extend = { "sources.default" },
        },
	{
            "neovim/nvim-lspconfig",
            dependencies = { "saghen/blink.cmp" },
            opts = {
                servers = {
                    lua_ls = {},
                    html = {},
                    cssls = {},
                }
            },
            config = function()
                local capabilities = require("blink.cmp").get_lsp_capabilities()
                local lspconfig = require("lspconfig")

                lspconfig["lua_ls"].setup({ capabilities = capabilities })
                lspconfig["html"].setup({ capabilities = capabilities })
                lspconfig["cssls"].setup({ capabilities = capabilities })
            end
        },
        {
            "akinsho/bufferline.nvim",
            dependencies = { "nvim-tree/nvim-web-devicons" },
            config = function()
                require("bufferline").setup({
                    options = {
                        offsets = {
                            {
                                filetype = "NvimTree",
                                text = "File Explorer",
                                highlight = "Directory",
                                separator = true -- Adds a separator between nvim-tree and bufferline
                            }
                        }
                    }
                })
            end
        },
        {
            "nvim-tree/nvim-tree.lua",
            dependencies = { "nvim-tree/nvim-web-devicons" },
            config = function()
            require("nvim-tree").setup()
            end
        },
	    {
            "windwp/nvim-autopairs",
            config = function()
            local npairs = require('nvim-autopairs')

            -- Integrate with Treesitter
            npairs.setup({
                check_ts = true,  -- Enable Treesitter support
            })
            end,
        },
        {
            "lukas-reineke/indent-blankline.nvim",
            main = "ibl",
            config = function()
            require("ibl").setup({
                indent = { char = "│", tab_char = "│" },
                scope = { enabled = false }, -- Disables scope to reduce glitches
            })
            end
        },
        {
            "kylechui/nvim-surround",
            version = "*", -- Use for stability; omit to use `main` branch for the latest features
            event = "VeryLazy",
            config = function()
                require("nvim-surround").setup({
                })
            end
        },
        {
            "windwp/nvim-ts-autotag",
            event = "InsertEnter",
            config = function()
                require("nvim-ts-autotag").setup()
            end,
        },
        {
            "nvim-treesitter/nvim-treesitter",
            build = ":TSUpdate",
            opts = {
                ensure_installed = { "html", "javascript", "typescript", "tsx", "vue", "svelte" },
                highlight = { enable = true },
            },
        }
    },
    -- Configure any other settings here. See the documentation for more details.
    -- colorscheme that will be used when installing plugins.
    install = { colorscheme = { "habamax" } },
    -- automatically check for plugin updates
    checker = { enabled = false },
})

vim.cmd.colorscheme "catppuccin"

vim.opt.relativenumber = true
vim.opt.number = true
vim.opt.clipboard = "unnamedplus"

vim.opt.expandtab = true  -- Use spaces instead of tabs
vim.opt.shiftwidth = 4     -- Set indent width to 4 spaces
vim.opt.tabstop = 4        -- Set tab width to 4 spaces
vim.opt.softtabstop = 4    -- Make backspace work as expected
vim.opt.smartindent = true -- Auto-indent new lines

vim.opt.undofile = true                      -- Enable persistent undo
vim.opt.undodir = vim.fn.stdpath("data") .. "/undo"  -- Set undo directory

vim.keymap.set("n", "<Space>e", ":NvimTreeOpen<CR>", { noremap = true, silent = true })

vim.keymap.set("n", "<Tab>", ":BufferLineCycleNext<CR>", { noremap = true, silent = true })
vim.keymap.set("n", "<S-Tab>", ":BufferLineCyclePrev<CR>", { noremap = true, silent = true })

-- transparent background
vim.cmd [[
    highlight Normal guibg=none
    highlight NonText guibg=none
    highlight Normal ctermbg=none
    highlight NonText ctermbg=none
]]
vim.api.nvim_set_hl(0, "NvimTreeWinSeparator", { fg = "#12131F", bg = "none" }) -- Change #ff0000 to your preferred color


