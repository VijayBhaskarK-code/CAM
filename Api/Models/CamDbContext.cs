﻿using Microsoft.EntityFrameworkCore;

namespace Api.Models;

public partial class CamDbContext : DbContext
{
    public CamDbContext()
    {
    }

    public CamDbContext(DbContextOptions<CamDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TemplateField> TemplateFields { get; set; }

    public virtual DbSet<TemplatePanel> TemplatePanels { get; set; }

    public virtual DbSet<TemplateParent> TemplateParents { get; set; }

    public virtual DbSet<TemplateSection> TemplateSections { get; set; }

    public virtual DbSet<TemplateType> TemplateTypes { get; set; }

    public virtual DbSet<TemplateVersion> TemplateVersions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=Vijay\\SQLExpress;Database=CAM;Trusted_Connection=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TemplateField>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC071D8C0814");

            entity.ToTable("TemplateField");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC0681E4AF4A").IsUnique();

            entity.Property(e => e.CreatedUtcDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedUtcDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplateSection).WithMany(p => p.TemplateFields)
                .HasForeignKey(d => d.TemplateSectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TemplateField_TemplateSection_Id");
        });

        modelBuilder.Entity<TemplatePanel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC0722A272C8");

            entity.ToTable("TemplatePanel");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC06AE77ED7F").IsUnique();

            entity.Property(e => e.CreatedUtcDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedUtcDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplateVersion).WithMany(p => p.TemplatePanels)
                .HasForeignKey(d => d.TemplateVersionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TemplatePanel_TemplateVersion_Id");
        });

        modelBuilder.Entity<TemplateParent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC0704E517DF");

            entity.ToTable("TemplateParent");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC063F92DBA2").IsUnique();

            entity.Property(e => e.CreatedUtcDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedUtcDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplateType).WithMany(p => p.TemplateParents)
                .HasForeignKey(d => d.TemplateTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TemplateParent_TemplateType_Id");
        });

        modelBuilder.Entity<TemplateSection>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC076B7CFECD");

            entity.ToTable("TemplateSection");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC06EC42579C").IsUnique();

            entity.Property(e => e.CreatedUtcDate).HasColumnType("datetime");
            entity.Property(e => e.Ctheader).HasColumnName("CTHeader");
            entity.Property(e => e.UpdatedUtcDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplatePanel).WithMany(p => p.TemplateSections)
                .HasForeignKey(d => d.TemplatePanelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TemplateSection_TemplatePanel_Id");
        });

        modelBuilder.Entity<TemplateType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC07D0EF520E");

            entity.ToTable("TemplateType");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC06E726953F").IsUnique();

            entity.Property(e => e.CreatedUtcDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedUtcDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<TemplateVersion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC07EEF363F8");

            entity.ToTable("TemplateVersion");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC0657B443E4").IsUnique();

            entity.Property(e => e.CreatedUtcDate).HasColumnType("datetime");
            entity.Property(e => e.PublishedUtcDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedUtcDate).HasColumnType("datetime");

            entity.HasOne(d => d.Template).WithMany(p => p.TemplateVersions)
                .HasForeignKey(d => d.TemplateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TemplateVersion_TemplateParent_Id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}